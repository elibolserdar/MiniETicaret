using ETicaretAPI.Application.Repositories;
using ETicaretAPI.Domain.Entities;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace ETicaretAPI.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductsController : ControllerBase
    {
        readonly private IProductReadRepository _productReadRepository;
        readonly private IProductWriteRepository _productWriteRepository;
        readonly private ICustomerWriteRepository _customerWriteRepository;
        private ICustomerReadRepository _customerReadRepository;

        public ProductsController(
            IProductReadRepository productReadRepository,
            IProductWriteRepository productWriteRepository,
            ICustomerWriteRepository customerWriteRepository,
            ICustomerReadRepository customerReadRepository)
        {
            _productReadRepository = productReadRepository;
            _productWriteRepository = productWriteRepository;
            _customerWriteRepository = customerWriteRepository;
            _customerReadRepository = customerReadRepository;
        }

        [HttpGet]
        public async Task<IActionResult> Get()
        {
            //await _customerWriteRepository.AddAsync(new()
            //{
            //    Id = Guid.NewGuid(),
            //    Name = "Serdarr"
            //});

            return Ok("Merhaba");

            //Customer customer = await _customerReadRepository.GetByIdAsync("cfe5c0c3-d51e-450f-b505-c4eb381adf23");

            //customer.Name = "Serdar Elibol";
            
            //_customerWriteRepository.Update(customer);

            //await _productWriteRepository.AddRangeAsync(new()
            //{
            //    new() { Id = Guid.NewGuid(), Name = "Product 4", Price = 400, Stock = 50},
            //    new() { Id = Guid.NewGuid(), Name = "Product 5", Price = 500, Stock = 50},
            //    new() { Id = Guid.NewGuid(), Name = "Product 6", Price = 600, Stock = 60}
            //});

            //await _productWriteRepository.SaveAsync();
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductByIdAsync(string id)
        {
            Product product = await _productReadRepository.GetSingleAsync(p=>p.Id == Guid.Parse(id), false);
            product.Name = "newnew4";
            await _productWriteRepository.SaveAsync();
            return Ok(product);
        }
    }
}
