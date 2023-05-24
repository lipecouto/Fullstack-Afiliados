using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Npgsql;
using backend.Configuration;
using System;
using System.Collections.Generic;
using NpgsqlTypes;

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
        public IActionResult GetData([FromBody] FiltersRequest filters)
        {
            try
            {   
                
                string? Prod = filters?.Filters?.Product;
                string? Sell = filters?.Filters?.Seller;
                
                if (string.IsNullOrEmpty(Sell) && string.IsNullOrEmpty(Prod))
                {   
                    var errorResponse = new { error = "InvalidRequest", message = "A solicitação é inválida. Deve ser fornecido pelo menos um valor para 'product' ou 'seller'." };
                    return BadRequest(JsonConvert.SerializeObject(errorResponse));
                }

                List<DataResult> dataResults = new List<DataResult>();

                using (var connection = new NpgsqlConnection(connectionString))
                {
                    connection.Open();
                  
                    if (!string.IsNullOrEmpty(Prod) && !string.IsNullOrEmpty(Sell))
                    {
                        var errorResponse = new { error = "InvalidRequest", message = "A solicitação é inválida. Os campos 'product' e 'seller' não podem ser especificados simultaneamente." };
                        return BadRequest(JsonConvert.SerializeObject(errorResponse));
                    }
                    
                    
                    string query;
        
                    NpgsqlParameter parameter;
                      
                    if (!string.IsNullOrEmpty(Prod))
                    {   
                        
                        query = "SELECT product, seller, SUM(amount) as total FROM transaction WHERE product = @product GROUP BY product, seller";
                        parameter = new NpgsqlParameter("@product", NpgsqlDbType.Text) { Value = Prod };
                    }
                    else
                    {
                        query = "SELECT seller, product, SUM(amount) as total FROM transaction WHERE seller = @seller GROUP BY seller, product";
                        parameter = new NpgsqlParameter("@seller", NpgsqlDbType.Varchar) { Value = Sell };
                    }

                    using (var command = new NpgsqlCommand(query, connection))
                    {
                        command.Parameters.Add(parameter);

                        using (var reader = command.ExecuteReader())
                        {
                            while (reader.Read())
                            {
                                string product = reader.GetString(0);
                                string seller = reader.GetString(1);
                                double total = reader.GetDouble(2);

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
        public string? Product { get; set; }
        public string? Seller { get; set; }
    }

    public class FiltersRequest
    {
        public Filters? Filters { get; set; }
    }


    
    public class DataResult
    {
        public string? Product { get; set; }
        public string? Seller { get; set; }
        public double Total { get; set; }
    }
}
