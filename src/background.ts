import getToken from "~getToken"

async function getAndPrintToken() {
  const token = await getToken()
  console.log("clerk token", token)
  setTimeout(() => {
    getAndPrintToken()
  }, 10000)
}

getAndPrintToken()
