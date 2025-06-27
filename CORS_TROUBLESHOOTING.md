# CORS Troubleshooting Guide

## Common CORS Error Solutions

### 1. Verify Environment Variables

Make sure your backend has the correct `FRONTEND_URL`:

**On Render Backend Service:**
```
FRONTEND_URL=https://pg-rental-frontend.onrender.com
```

### 2. Check API URL in Frontend

Ensure your frontend has the correct API URL:

**On Render Frontend Service:**
```
REACT_APP_API_URL=https://pg-rental-backend.onrender.com/api
```

### 3. Clear Browser Cache

CORS policies can be cached. Try:
- Hard refresh: `Ctrl+Shift+R` (Windows) or `Cmd+Shift+R` (Mac)
- Open in incognito/private mode
- Clear site data in DevTools

### 4. Debug CORS Issues

1. Open Browser DevTools → Network tab
2. Look for the OPTIONS preflight request
3. Check response headers:
   - `Access-Control-Allow-Origin` should match your frontend URL
   - `Access-Control-Allow-Credentials` should be `true`

### 5. Test Locally First

Before deploying, test with local backend:

```bash
# Backend terminal
cd backend
npm start

# Frontend terminal (new terminal)
cd frontend
REACT_APP_API_URL=http://localhost:5001/api npm start
```

### 6. Quick Fixes for Development

If you need to temporarily allow all origins for testing:

```javascript
// In backend/src/server.js (DEVELOPMENT ONLY!)
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));
```

**⚠️ Never use this in production!**

### 7. Render-Specific Issues

If CORS works locally but not on Render:

1. **Check Service Logs**:
   - Go to Render Dashboard
   - Click on your backend service
   - Check "Logs" for CORS-related errors

2. **Verify Both Services are Running**:
   - Both frontend and backend should show "Live"
   - If backend is sleeping, first request will fail

3. **Update After Deploy**:
   - After both services are deployed, update `FRONTEND_URL` on backend
   - This triggers a redeploy with correct CORS settings

### 8. Manual Testing

Test your API directly:

```bash
# Test from your local machine
curl -X GET https://pg-rental-backend.onrender.com/api/health \
  -H "Origin: https://pg-rental-frontend.onrender.com" \
  -v
```

Look for these headers in response:
```
Access-Control-Allow-Origin: https://pg-rental-frontend.onrender.com
Access-Control-Allow-Credentials: true
```

### 9. Common Mistakes

- ❌ Trailing slash in URLs (`https://example.com/` vs `https://example.com`)
- ❌ HTTP vs HTTPS mismatch
- ❌ Wrong port numbers
- ❌ Forgetting to save environment variables on Render
- ❌ Not waiting for backend to fully deploy

### 10. If Nothing Works

As a last resort, you can temporarily set a permissive CORS policy:

1. In Render backend environment variables, add:
   ```
   CORS_ORIGIN=*
   ```

2. Update your cors middleware to check for this:
   ```javascript
   origin: process.env.CORS_ORIGIN === '*' ? true : corsOptions.origin
   ```

3. Once working, gradually restrict origins for security

## Need More Help?

1. Check browser console for specific error messages
2. Look at Network tab for failed requests
3. Verify all URLs are exactly correct (no typos)
4. Ensure both services are deployed and running