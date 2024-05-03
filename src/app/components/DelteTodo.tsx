"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";

const DeleteTodo = ({ todoId }: { todoId: number }) => {
  const { refresh } = useRouter();

  const handleDelte = async (id: number) => {
    try {
      const res = await fetch("/api/todo", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id }),
      });
      if (!res.ok) {
        throw new Error("Failed to delete todo");
      }
      refresh();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <button
      type="button"
      className="ml-auto"
      onClick={() => handleDelte(todoId)}
    >
      <Image
        src={"/delete-icon.png"}
        width={25}
        height={25}
        alt="delete-icon"
      />
    </button>
  );
};

export default DeleteTodo;
