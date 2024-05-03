import { Todo } from "@/lib/drizzle";
import DeleteTodo from "./DelteTodo";

const getData = async () => {
  try {
    const res = await fetch(
      `${
        process.env.NODE_ENV == "development"
          ? "http://localhost:3000/"
          : "https://next-todo-app-nine-nu.vercel.app/"
      }/api/todo`,
      {
        method: "GET",
        cache: "no-cache",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (!res.ok) {
      throw new Error("Failed to Fetch");
    }
    const result = await res.json();
    return result;
  } catch (err) {
    console.log(err);
  }
};

const TodoList = async () => {
  const res: Todo[] = await getData();
  return (
    <div className="max-h-[350px] overflow-auto mb-4 p-4 scrollbar scrollbar-thumb-cyan-50 scrollbar-track-gray-400">
      {res.map((item) => {
        return (
          <div
            key={item.id}
            className="bg-gray-100 px-4 py-4 my-5 rounded-2xl flex items-center gap-x-4 "
          >
            {/* Cricle  */}
            <div className="h-3 w-3 bg-cyan-500 rounded-full"></div>
            {/* Task Detail's */}
            <p className="text-lg font-medium ">{item.task}</p>
            {/* Delete Button-Component*/}
            <DeleteTodo todoId={item.id} />
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
