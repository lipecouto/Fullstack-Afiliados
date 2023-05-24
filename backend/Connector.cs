using DotNetEnv;

namespace backend.Configuration
{
    public static class DatabaseConfiguration
    {
        static string? dbHost;
        static string? dbPort;
        static string? dbDatabase;
        static string? dbUser;
        static string? dbPassword;

        public static void LoadConfiguration()
        {
            Env.Load();
            dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            dbPort = Environment.GetEnvironmentVariable("DB_PORT");
            dbDatabase = Environment.GetEnvironmentVariable("DB_DATABASE");
            dbUser = Environment.GetEnvironmentVariable("DB_USER");
            dbPassword = Environment.GetEnvironmentVariable("DB_PASSWORD");
        }

        public static string GetConnectionString()
        {
            return $"Host={dbHost};Port={dbPort};Database={dbDatabase};Username={dbUser};Password={dbPassword}";
        }
    }
}