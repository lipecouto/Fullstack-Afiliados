using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using backend.Configuration;

namespace backend.Controllers
{
    [ApiController]
    [Route("getData")]
    public class DataController : ControllerBase
    {
        private readonly string connectionString;

        public DataController()
        {   
            DatabaseConfiguration.LoadConfiguration();
            connectionString = DatabaseConfiguration.GetConnectionString();
        }

        [HttpPost]
        public IActionResult GetData([FromBody] Filters filters)
        {   
            try
            {
                if (filters == null || (string.IsNullOrEmpty(filters.Product) && string.IsNullOrEmpty(filters.Seller)))
                {
                    var errorResponse = new { error = "InvalidRequest", message = "A solicitação é inválida. Deve ser fornecido pelo menos um valor para 'product' ou 'seller'." };
                    return BadRequest(JsonConvert.SerializeObject(errorResponse));
                }

                List<DataResult> dataResults = new List<DataResult>();

                using (var connection = new NpgsqlConnection(connectionString))
                {
                    connection.Open();

                    // Consultar as transações agrupadas por produto e vendedor
                    if (!string.IsNullOrEmpty(filters.Product))
                    {
                        using (var command = new NpgsqlCommand())
                        {
                            command.Connection = connection;
                            command.CommandText = "SELECT product, seller, SUM(amount) as total FROM transaction WHERE product = @product GROUP BY product, seller";
                            command.Parameters.AddWithValue("@product", filters.Product);

                            using (var reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    string product = reader.GetString(0);
                                    string seller = reader.GetString(1);
                                    decimal total = reader.GetDecimal(2);

                                    DataResult result = new DataResult
                                    {
                                        Product = product,
                                        Seller = seller,
                                        Total = total
                                    };

                                    dataResults.Add(result);
                                }
                            }
                        }
                    }

                    // Consultar as transações agrupadas por vendedor e produto
                    if (!string.IsNullOrEmpty(filters.Seller))
                    {
                        using (var command = new NpgsqlCommand())
                        {
                            command.Connection = connection;
                            command.CommandText = "SELECT seller, product, SUM(amount) as total FROM transaction WHERE seller = @seller GROUP BY seller, product";
                            command.Parameters.AddWithValue("@seller", filters.Seller);

                            using (var reader = command.ExecuteReader())
                            {
                                while (reader.Read())
                                {
                                    string seller = reader.GetString(0);
                                    string product = reader.GetString(1);
                                    decimal total = reader.GetDecimal(2);

                                    DataResult result = new DataResult
                                    {
                                        Product = product,
                                        Seller = seller,
                                        Total = total
                                    };

                                    dataResults.Add(result);
                                }
                            }
                        }
                    }
                }

                if (dataResults.Count == 0)
                {
                    var errorResponse = new { error = "NoDataFound", message = "Nenhum dado encontrado para os critérios de filtro fornecidos." };
                    return NotFound(JsonConvert.SerializeObject(errorResponse));
                }

                return Ok(dataResults);
            }
            catch (Exception ex)
            {
                var errorResponse = new { error = "DataProcessingError", message = $"Ocorreu um erro durante o processamento da solicitação: {ex.Message}" };
                return StatusCode(StatusCodes.Status500InternalServerError, JsonConvert.SerializeObject(errorResponse));
            }
        }
    }

    public class Filters
    {
        public string Product { get; set; }
        public string Seller { get; set; }
    }

    public class DataResult
    {
        public string Product { get; set; }
        public string Seller { get; set; }
        public decimal Total { get; set; }
    }
}
