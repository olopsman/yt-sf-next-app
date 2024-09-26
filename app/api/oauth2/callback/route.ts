import {OAuth2, Connection} from 'jsforce';
import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

const oauth2 = new OAuth2({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: process.env.REDIRECT_URI,
  });

  export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const code = searchParams.get('code');
    const error = searchParams.get('error');

    if (error) {
      return NextResponse.json({ error: 'Salesforce Oauth Error:' + error});
    }

    if (!code) {
      return NextResponse.json({ error: 'No Authorization code found'});
    }

    try {
        const conn = new Connection({ oauth2 });
        

        await conn.authorize(code);

        // Set the access token in an HTTP-only, secure cookie
        cookies().set({
        name: 'salesforce_access_token',
        value: conn.accessToken || '',  // the access token
        httpOnly: true,  // for security, the cookie is accessible only by the server
        secure: process.env.NODE_ENV === 'production',  // send cookie over HTTPS only in production
        path: '/',  // cookie is available on every route
        maxAge: 60 * 60 * 24 * 7,  // 1 week
     });
      
          // Optionally, you can store the instance URL in a cookie if needed
          cookies().set({
              name: 'salesforce_instance_url',
              value: conn.instanceUrl || '',
              httpOnly: true,
              secure: process.env.NODE_ENV === 'production',
              path: '/',
              maxAge: 60 * 60 * 24 * 7,  // 1 week
          });

        return NextResponse.redirect(new URL('/dashboard', req.url));
    } catch(err) {
        return NextResponse.json({ error: 'Salesforce Oauth Error:' + err});
    }
  }