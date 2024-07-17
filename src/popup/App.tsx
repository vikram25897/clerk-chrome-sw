import {
  ClerkProvider,
  SignedIn,
  SignedOut,
  SignIn,
  SignUp
} from "@clerk/chrome-extension"
import { Route, Routes, useNavigate } from "react-router-dom"

export default function MyApp() {
  const clerkPubKey = process.env[
    "PLASMO_PUBLIC_CLERK_PUBLISHABLE_KEY"
  ] as string
  const navigate = useNavigate()

  return (
    <ClerkProvider
      publishableKey={clerkPubKey}
      routerPush={(to) => navigate(to)}
      routerReplace={(to) => navigate(to, { replace: true })}>
      <Routes>
        <Route
          path="/sign-up/*"
          element={
            <div style={{ width: 400, padding: 10 }}>
              <SignUp
                signInUrl="/"
                appearance={{
                  elements: {
                    socialButtons: {
                      display: "none"
                    },
                    dividerRow: {
                      display: "none"
                    }
                  }
                }}
              />
            </div>
          }
        />
        <Route
          path="/"
          element={
            <div style={{ width: 400, padding: 10, height: 800 }}>
              <SignedIn>
                <div>
                  <h1>Welcome back!</h1>
                  <p>
                    You're signed in. You can now access your account settings
                    and other features.
                  </p>
                </div>
              </SignedIn>
              <SignedOut>
                <SignIn
                  appearance={{
                    elements: {
                      socialButtons: {
                        display: "none"
                      },
                      dividerRow: {
                        display: "none"
                      }
                    }
                  }}
                  signUpUrl="/sign-up"
                />
              </SignedOut>
              <hr />
            </div>
          }
        />
      </Routes>
    </ClerkProvider>
  )
}
