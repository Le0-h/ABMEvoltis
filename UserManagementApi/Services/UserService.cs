using AutoMapper;
using UserManagementApi.DTOs;
using UserManagementApi.Entities;
using UserManagementApi.Repositories;

namespace UserManagementApi.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IMapper _mapper;

        public UserService(IUserRepository userRepository, IMapper mapper)
        {
            _userRepository = userRepository;
            _mapper = mapper;
        }

        public async Task<IEnumerable<UserDto>> GetAllUsersAsync()
        {
            var users = await _userRepository.GetAllAsync();
            return _mapper.Map<IEnumerable<UserDto>>(users);
        }

        public async Task<UserDto?> GetUserByIdAsync(int id)
        {
            var user = await _userRepository.GetByIdAsync(id);
            return user == null ? null : _mapper.Map<UserDto>(user);
        }

        public async Task<UserDto> CreateUserAsync(CreateUserDto createUserDto)
        {
            var user = _mapper.Map<User>(createUserDto);
            var createdUser = await _userRepository.CreateAsync(user);
            return _mapper.Map<UserDto>(createdUser);
        }

        public async Task UpdateUserAsync(int id, UpdateUserDto updateUserDto)
        {
            var existingUser = await _userRepository.GetByIdAsync(id);
            if (existingUser == null)
                throw new KeyNotFoundException($"Usuario con id {id} no encontrado");

            _mapper.Map(updateUserDto, existingUser);
            await _userRepository.UpdateAsync(existingUser);
        }

        public async Task DeleteUserAsync(int id)
        {
            var exists = await _userRepository.ExistsAsync(id);
            if (!exists)
                throw new KeyNotFoundException($"Usuario con id {id} no encontrado");

            await _userRepository.DeleteAsync(id);
        }
    }
}