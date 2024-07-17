import { Clerk } from '@clerk/clerk-js/headless'
import { DEV_BROWSER_JWT_KEY } from '@clerk/shared'
import { parsePublishableKey } from '@clerk/shared/keys'
import browser from 'webextension-polyfill'

type BuildClerkOptions = {
  publishableKey: string;
  frontendApi: string;
};

export async function buildClerk({ publishableKey, frontendApi }: BuildClerkOptions): Promise<Clerk> {
  const key = parsePublishableKey(publishableKey)
  console.log('key', publishableKey);
  console.log('frontendApi', frontendApi);
  if(!key) throw new Error('Invalid publishable key')

  // Set up cookie params based on environment
  const cookieParams = {
      url: frontendApi,
      name: DEV_BROWSER_JWT_KEY,
    }

  // Create Clerk instance
  const clerk = new Clerk(publishableKey)
  const client = clerk.getFapiClient()

  client.onBeforeRequest(async requestInit => {
    requestInit.credentials = 'omit'
    requestInit.url?.searchParams.append('_is_native', '1')
    console.log('cookieParams', cookieParams)
    const clientJWT = await browser.cookies.get({
      url: cookieParams.url,
      name: cookieParams.name
    });
    console.log('clientJWT', clientJWT);
    (requestInit.headers as Headers).set('authorization', clientJWT?.value || '')
  })

  return clerk
}