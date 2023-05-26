using System;
using System.IO;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;
using backend.Controllers;
using Microsoft.AspNetCore.Mvc;
using Xunit;

namespace backend.Tests
{
    public class FileControllerTests
    {
        private readonly FileController _fileController;

        public FileControllerTests()
        {
            _fileController = new FileController();
        }

        [Fact]
        public void Post_GetFile_ValidFile_ReturnsOk()
        {
            // Arrange
            var fileContent = "12023-05-01 09:00:00Product1        100000    Seller1     \n" +
                              "22023-05-02 10:00:00Product2        200000    Seller2     \n";

            var formFile = new FormFile(new MemoryStream(System.Text.Encoding.UTF8.GetBytes(fileContent)), 0, fileContent.Length, "file", "testfile.txt");

            // Act
            var result = _fileController.GetFile(formFile) as OkObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.OK, result.StatusCode);

            var transactions = result.Value as List<Transactions>;
            Assert.NotNull(transactions);
            Assert.Equal(2, transactions.Count);
        }

        [Fact]
        public void Post_GetFile_NoFile_ReturnsBadRequest()
        {
            // Arrange
            var formFile = new FormFile(null, 0, 0, "file", "testfile.txt");

            // Act
            var result = _fileController.GetFile(formFile) as BadRequestObjectResult;

            // Assert
            Assert.NotNull(result);
            Assert.Equal((int)HttpStatusCode.BadRequest, result.StatusCode);

            var errorResponse = result.Value as dynamic;
            Assert.NotNull(errorResponse);
            Assert.Equal("FileNotReceived", errorResponse.error.ToString());
            Assert.Equal("O arquivo não foi recebido corretamente.", errorResponse.message.ToString());
        }
    }
}
