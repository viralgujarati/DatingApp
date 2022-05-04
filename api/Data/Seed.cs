using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;
using System.Text.Json;
using System.Threading.Tasks;
using api.Data;
using api.Entities;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class Seed
    {
        public static async Task SeedUsers(DataContext context)
        {
            if (await context.Users.AnyAsync()) return;

            var userData = await System.IO.File.ReadAllTextAsync("Data/UserSeedData.json");
            var users = JsonSerializer.Deserialize<List<AppUser>>(userData);
            if (users == null) return;

            // var roles = new List<AppRole>
            // {
            //     new AppRole{Name = "Member"},
            //     new AppRole{Name = "Admin"},
            //     new AppRole{Name = "Moderator"},
            // };

            // foreach (var role in roles)
            // {
            //     await roleManager.CreateAsync(role);
            // }
            
            foreach (var user in users)
            {
                if(await context.Users.AnyAsync()) return;
                using var hmac = new HMACSHA512();

                user.UserName = user.UserName.ToLower();
                user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes("Pa$$word"));
                user.PasswordSalt = hmac.Key;
                context.Users.Add(user);
                // await userManager.CreateAsync(user, "Pa$$w0rd");
                // await userManager.AddToRoleAsync(user, "Member");
            }

                await context.SaveChangesAsync();
            // var admin = new AppUser
            // {
            //     UserName = "admin"
            // };

            // await userManager.CreateAsync(admin, "Pa$$w0rd");
            // await userManager.AddToRolesAsync(admin, new[] {"Admin", "Moderator"});
        }
    }
}
