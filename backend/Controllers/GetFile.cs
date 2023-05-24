using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using backend.Configuration;
//using DotNetEnv;


namespace backend.Controllers
{
    [ApiController]
    //definindo a rota do arquivo
    [Route("getFile")]
    public class FileController : ControllerBase
    {   
        
        // Carrega as variáveis de ambiente do arquivo .env
        private readonly string connectionString;
        
        public FileController()
        {   
            DatabaseConfiguration.LoadConfiguration();
            connectionString = DatabaseConfiguration.GetConnectionString();
        }

        [HttpPost (Name = "getFile")]
        
        public IActionResult GetFile([FromForm] IFormFile file)
        {
            try
            {
                if (file == null || file.Length == 0)
                {
                    var errorResponse = new { error = "FileNotReceived", message = "O arquivo não foi recebido corretamente." };
                    return BadRequest(JsonConvert.SerializeObject(errorResponse));
                }

                List<Transactions> transactions = new List<Transactions>();

                using (StreamReader reader = new StreamReader(file.OpenReadStream()))
                {   
                    
                    Console.WriteLine(file.FileName);
                    while (!reader.EndOfStream)
                    {   
                        
                        string? line = reader.ReadLine();
                       
                        if (string.IsNullOrWhiteSpace(line)){
                            // Linha vazia encontrada, interromper o loop
                            break;
                        }
                                            
                        string type = line.Substring(0, 1);
                        string dateStr = line.Substring(1, 25);
                        string product = line.Substring(26, 30);
                        string amountStr = line.Substring(56, 10);
                        string seller = line.Substring(66, line.Length-66);

                      

                        DateTime date = DateTime.Parse(dateStr);
                        decimal amount = decimal.Parse(amountStr) / 100;  // Converter centavos para reais

                        Transactions transaction = new Transactions
                        {
                            Type = type,
                            Date = date,
                            Product = product,
                            Amount = amount,
                            Seller = seller
                        };

                        transactions.Add(transaction);
                    }

                }
                using (var connection = new NpgsqlConnection(connectionString))
                {
                    connection.Open();
                    using (var command = new NpgsqlCommand()){
                        command.Connection = connection;
                        foreach (var transaction in transactions){

                            if (transaction.Type == null){
                                throw new Exception("Campo 'tipo' inválido no arquivo.");
                            }
                             if (transaction.Date == null){
                                throw new Exception("Campo 'Data' inválido no arquivo.");
                            }
                            if (transaction.Product == null){
                                throw new Exception("Campo 'Produto' inválido no arquivo.");
                            }
                            
                            if (transaction.Seller == null){
                                throw new Exception("Campo 'Vendedor' inválido no arquivo.");
                            }
                            
                            if (transaction.Amount  <= 0 ){
                                throw new Exception("Campo 'Valor' zerado é inválido");
                            }
                            
                            command.CommandText = "INSERT INTO transaction (tipo, date, product, amount, seller) VALUES (@tipo, @date, @product, @amount, @seller)";
                            command.Parameters.AddWithValue("@tipo", transaction.Type);
                            command.Parameters.AddWithValue("@date", transaction.Date);
                            command.Parameters.AddWithValue("@product", transaction.Product);
                            command.Parameters.AddWithValue("@amount", transaction.Amount);
                            command.Parameters.AddWithValue("@seller", transaction.Seller);
                            command.ExecuteNonQuery();
                        }
                    }
                }

                return Ok(transactions);
            }
            catch (Exception ex)
            {
                var errorResponse = new { error = "FileProcessingError", message = $"Ocorreu um erro durante o processamento do arquivo: {ex.Message}" };
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(errorResponse));
            }
        }
    }
}
