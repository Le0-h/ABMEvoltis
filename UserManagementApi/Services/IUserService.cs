using UserManagementApi.DTOs;

namespace UserManagementApi.Services
{
    public interface IUserService
    {
        Task<IEnumerable<UserDto>> GetAllUsersAsync();
        Task<UserDto?> GetUserByIdAsync(int id);
        Task<UserDto> CreateUserAsync(CreateUserDto createUserDto);
        Task UpdateUserAsync(int id, UpdateUserDto updateUserDto);
        Task DeleteUserAsync(int id);
    }
}