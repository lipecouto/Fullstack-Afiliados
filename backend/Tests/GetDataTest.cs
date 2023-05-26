using backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend;
public class UnitTest1
{
    public class DataControllerTests
    {
        [Fact]
        public void GetData_ReturnsOkResult()
        {
            // Arrange
            var controller = new DataController();

            // Act
            var result = controller.GetData(new FiltersRequest());

            // Assert
            Assert.IsType<OkObjectResult>(result);
        }
    }
}