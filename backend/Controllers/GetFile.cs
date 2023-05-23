using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
namespace backend.Controllers
{
    [ApiController]
    //definindo a rota do arquivo
    [Route("getFile")]
    public class FileController : ControllerBase
    {
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
