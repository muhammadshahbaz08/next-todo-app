"use client";
import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AddTodo = () => {
  const [task, setTask] = useState<string>(""); // Initialize task as an empty string
  const [loading, setLoading] = useState<boolean>(false); // Initialize loading states
  const { refresh } = useRouter();

  const handleSubmit = async () => {
    try {
      if (task) {
        setLoading(true); //Set loading state to true when API call starts
        await fetch("api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ task }),
        });
        setTask("");
      }
      refresh();
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <div>
      <form className="flex w-full gap-x-2 m-2 justify-center">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          className="w-72 rounded-full border focus:outline-secondary px-4"
          placeholder="Write a new Task"
        />
        <button
          type="button"
          onClick={handleSubmit}
          className={`p-4 shrink-0 rounded-full bg-cyan-700 ${
            loading ? "cursor-wait" : "cursor-pointer"
          }`} // Changing cursor Style
          disabled={loading} //Disabled Button During Loading
        >
          {loading ? (
            <div className="animate-spin h-5 w-5">
              <Image src={"/loader.png"} width={40} height={40} alt="loading" />
            </div>
          ) : (
            <Image src={"/vector.png"} width={20} height={20} alt="vector" />
          )}
        </button>
      </form>
    </div>
  );
};

export default AddTodo;
