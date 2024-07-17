import { buildClerk } from '~/buildClerk'

async function getToken() {
  try {
    const clerk = await buildClerk({
      publishableKey: process.env.PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY as string,
      frontendApi: process.env.PLASMO_PUBLIC_CLERK_FRONTEND_API as string
    });

    console.log('clerk', clerk)

    await clerk.load({ standardBrowser: false });
    console.log('clerk loaded')
    return await clerk.session?.getToken({skipCache: true})
  } catch (error) {
    console.log('Error getting token:', error)
    return null
  }

}

export default getToken;