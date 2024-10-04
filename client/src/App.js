import Footer from "./components/Footer"

function App() {
  return (
    <div className="app">
      <h1>Welcome</h1>
      <p>Your usage of router.route('/').get(getUsers) is perfectly fine for defining a route to fetch users. Just ensure it fits within your overall application structure and follows best practices for API design. If you need any further guidance or have additional questions, feel free to ask!</p>
      <h2>Ensure that your API responses are consistent. If you're excluding fields in this route, consider how you handle those fields in other routes, such as when creating or updating users.</h2>
      <Footer/>
    </div>
  )
}

export default App
