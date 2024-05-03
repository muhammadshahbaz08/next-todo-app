import TodoList from "../app/components/TodoList";
import AddTodo from "../app/components/AddTodo";
import { ToastContainer } from "react-toastify";
export default function Home() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
      <main className="bg-gradient-to-tr from-primary to-secondary h-screen flex justify-center items-center">
        <div className="px-3 py-4 rounded-xl  bg-gradient-to-br from-[#EDEDED]/0 to-[#D9D9D9]/100 backdrop-blur-xl  drop-shadow-2xl w-full max-w-md">
          {/* Todo List */}
          <TodoList />
          {/* Add New Todo */}
          <AddTodo />
          {/* Bar */}
          <div className="w-1/2 h-1 bg-[#2D2D2D] rounded mx-auto mt-6"></div>
        </div>
      </main>
    </>
  );
}
