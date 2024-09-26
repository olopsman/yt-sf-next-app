import { OAuth2 } from 'jsforce';
import { NextResponse } from 'next/server';

const oauth2 = new OAuth2({
    // you can change loginUrl to connect to sandbox or prerelease env.
    // loginUrl : 'https://test.salesforce.com',
    clientId: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      redirectUri: process.env.REDIRECT_URI,
  });

  export async function GET() {
    const authUrl = oauth2.getAuthorizationUrl({scope: 'api id web'})

    return NextResponse.redirect(authUrl);
  }