import "./config/connection"
import Layout from "./components/Layout"
// import CreateTodoModal from "./components/CreateTodoModal"
// import Todos from "./components/Todos"
import CreateProposalModal from "./components/CreateProposalModal"
import Proposals from "./components/Proposals"


function App() {

  return (
    <Layout>
      <CreateProposalModal />
      {/* <Todos /> */}
      <Proposals />
    </Layout>
  )
}

export default App