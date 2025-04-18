using AutoMapper;
using UserManagementApi.DTOs;
using UserManagementApi.Entities;

namespace UserManagementApi.Mappings
{
    public class MappingProfile : Profile
    {
        public MappingProfile()
        {
            // Mapeo de User a UserDto
            CreateMap<User, UserDto>();
            
            // Si necesitas el mapeo inverso (UserDto a User)
            CreateMap<UserDto, User>();
            CreateMap<CreateUserDto, User>();
            CreateMap<UpdateUserDto, User>();
            
            // Si tienes DTOs adicionales para crear/actualizar, agrégalos aquí
            // CreateMap<CreateUserDto, User>();
            // CreateMap<UpdateUserDto, User>();
        }
    }
}