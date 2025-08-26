# Get Referral - Job Referral Marketplace

A modern Next.js application that connects job seekers with company employees for job referrals.

## 🚀 Features

- **User Authentication**: Role-based access (candidates vs referrers)
- **Company Discovery**: Browse and search companies by industry/tags
- **Referral Management**: Create and manage referral events
- **Modern UI**: Beautiful, responsive design with gradients and animations
- **API Integration**: Configurable backend API integration

## 🛠️ API Configuration

The application is configured to fetch companies data from an external API. You can easily change the API endpoint through configuration.

### Configuration Files

1. **`lib/config.ts`** - Main configuration file
2. **Environment Variables** - Override default settings

### Changing API Base URL

#### Option 1: Environment Variable (Recommended)
Create a `.env.local` file in your project root:

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

#### Option 2: Direct Code Change
Edit `lib/config.ts`:

```typescript
export const API_CONFIG = {
  BASE_URL: 'http://your-api-server.com', // Change this line
  // ... rest of config
};
```

### API Endpoints

The application expects the following API structure:

- **`/jobs`** - Returns companies/jobs data
- **`/companies`** - Company-specific endpoints
- **`/referrals`** - Referral management
- **`/users`** - User management

### Expected API Response Format

```typescript
interface Company {
  id: number;
  name: string;
  logo: string;
  tags: string[];
  careersUrl: string;
  description?: string;
  industry?: string;
  size?: string;
  location?: string;
}

interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  error?: string;
}
```

## 🏃‍♂️ Getting Started

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Configure API**:
   - Copy `.env.local.example` to `.env.local`
   - Update `NEXT_PUBLIC_API_BASE_URL` to point to your API

3. **Start development server**:
   ```bash
   npm run dev
   ```

4. **Build for production**:
   ```bash
   npm run build
   npm start
   ```

## 🔧 Development

### Project Structure

```
ref-ui/
├── app/                    # Next.js app router pages
├── components/            # Reusable UI components
├── lib/                  # Utility functions and API config
├── hooks/                # Custom React hooks
├── contexts/             # React context providers
└── components/ui/        # Shadcn/ui components
```

### Key Components

- **`useCompanies`** - Hook for managing companies data
- **`companiesApi`** - API service for companies
- **`API_CONFIG`** - Centralized API configuration

### Adding New API Endpoints

1. Update `lib/config.ts` with new endpoint
2. Add corresponding method in `lib/api.ts`
3. Create custom hook if needed
4. Use in your components

## 🌐 Environment-Specific Configurations

### Development
```bash
NEXT_PUBLIC_API_BASE_URL=http://localhost:4000
```

### Staging
```bash
NEXT_PUBLIC_API_BASE_URL=https://api-staging.yourapp.com
```

### Production
```bash
NEXT_PUBLIC_API_BASE_URL=https://api.yourapp.com
```

## 📝 Notes

- The application gracefully handles API failures with fallback UI
- All API calls include proper error handling and loading states
- The configuration system makes it easy to switch between environments
- TypeScript interfaces ensure type safety across the application

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.
