import PendingTasksForm from "../../components/forms/PendingTaskList";
import TaskList from "../../components/TaskList";
//import CardComponent from "../../components/Card";

const UserTask = () => {
  return (
    <main className="flex flex-col md:flex-row h-screen justify-center items-center w-">
      <div className="content-center w-1/2 border-r-[1px] border-neutral-300 min-h-screen px-6">
        <PendingTasksForm />
      </div>
      <div className="flex justify-center w-1/2">
        <TaskList />
      </div>
    </main>
  );
};
export default UserTask;
