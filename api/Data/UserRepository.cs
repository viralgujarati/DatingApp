using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTOs;
using api.Entities;
using api.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace api.Data
{
    public class UserRepository : IUserRepository
    {
        private readonly DataContext _context;
        private readonly IMapper _mapper;

        public UserRepository(DataContext context, IMapper mapper)
        {
            _mapper = mapper;
            _context = context;
        }

       public async Task<MemberDto> GetMemberAsync(string username)
        {
            return await _context.Users
                .Where(x => x.UserName == username)
                .ProjectTo<MemberDto>(_mapper.ConfigurationProvider)
                .SingleOrDefaultAsync();
        }

        public Task<IEnumerable<MemberDto>> GetMembersAsync()
        {
            throw new NotImplementedException();
        }

        public async Task<AppUser> GetUserByIdAsync(int id)
        {
            return await _context.Users.FindAsync(id);
        }

        public async Task<AppUser> GetUserByUsernameAsync(string username)
        {
            return await _context.Users
                .Include(p => p.Photos)
                .SingleOrDefaultAsync(x => x.UserName == username);
        }

       public async Task<IEnumerable<AppUser>> GetUsersAsync()
        {
           return await _context.Users
           .Include(p=>p.Photos)
           .ToListAsync();
        }

        public async Task<bool> SaveAllAsync()
        {
            return await _context.SaveChangesAsync() > 0 ;
        }
        public void Update(AppUser user)
        {
            _context.Entry(user).State = EntityState.Modified;
        }

        // public async Task<MemberDto> GetMembersAsync(string username)
        // {
        //     return await _context.Users
        //     .Where(x=>x.UserName == username)
        //     .Select(user => new MemberDto
        //     {
        //         Id = user.Id,
        //         Username = user.UserName
        //     }).SingleOrDefaultAsync();
        // }


        // public async Task<AppUser> GetUserByIdAsync(int id)
        // {
        //     return await _context.Users.FindAsync(id);
        // }

        // public async Task<AppUser> GetUserByUsernameAsync(string username)
        // {
        //     return await _context.Users
        //     .Include(p=>p.Photos)
        //     .SingleOrDefaultAsync(x => x.UserName == username);
        // }

        // public async Task<IEnumerable<AppUser>> GetUsersAsync()
        // {
        //    return await _context.Users
        //    .Include(p=>p.Photos)
        //    .ToListAsync();
        // }

        // public async Task<bool> SaveAllAsync()
        // {
        //     return await _context.SaveChangesAsync() > 0 ;
        // }
        // public void Update(AppUser user)
        // {
        //     _context.Entry(user).State = EntityState.Modified;
        // }
    }
}