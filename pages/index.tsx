import type { NextPage } from 'next'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { supabase } from '../client'
const Home: NextPage = () => {
  const [task, setTask] = useState({
    Name: '',
    Activity: '',
    StartDate: '',
    EndDate: '',
  })
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    getTasks()
  }, [])
  const [tasks, setTasks] = useState([])

  const { Name, Activity, StartDate, EndDate } = task

  async function addTask() {
    await supabase
      .from('Task') // select the table
      .insert({
        Name,
        Activity,
        StartDate,
        EndDate,
      }) // insert the new task
      .single()

    setTask({
      Name: '',
      Activity: '',
      StartDate: '',
      EndDate: '',
    }) // Reset the task details
    getTasks()
  }
  async function getTasks() {
    const { data }: { data: any } = await supabase.from('Task').select() // select all the tasks
    setTasks(data)
    setLoading(false)
  }
  async function deleteTask(id: string) {
    await supabase.from('Task').delete().eq('id', id) // the id of row to delete
    getTasks()
  }
  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <div className="mt-36 h-32 w-32 animate-spin rounded-full border-t-2 border-b-2 border-blue-500"></div>
      </div>
    )
  }
  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div>
        <Head>
          <title>Supabase and NextJs Demo</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <main className="flex w-full flex-1 flex-col items-center justify-center px-20 text-center">
          <h1 className="mt-20 text-4xl font-bold">
            <a className="text-blue-600">
              {/* Full Stack Application With Tailwind CSS and Supabase in NextJs */}
              Demo App
            </a>
          </h1>

          <div className="mt-6 flex max-w-4xl flex-wrap items-center justify-start sm:w-full">
            {/* <div className="mt-6 w-96 rounded-xl border p-8 hover:text-blue-600 focus:text-blue-600"> */}
            <div className="mt-6 w-96 rounded-xl border p-8  focus:text-blue-600">
              <div className="w-full max-w-sm">
                <form className="mb-4 rounded bg-white px-8 pt-6 pb-8">
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="taskName"
                    >
                      Task Name
                    </label>
                    <input
                      className="focus: focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow outline-none"
                      id="taskName"
                      type="text"
                      value={Name.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Name: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="text-gray mb-2 block text-sm font-bold"
                      htmlFor="taskActivity"
                    >
                      Task Activity
                    </label>
                    <textarea
                      className="form-textarea focus:shadow-outline mt-1 block w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      rows={3}
                      placeholder="Task Activity"
                      value={Activity.toString()}
                      onChange={(e) =>
                        setTask({ ...task, Activity: e.target.value })
                      }
                    ></textarea>
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="startDate"
                    >
                      Task Start Date
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="startDate"
                      type="date"
                      value={StartDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, StartDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="mb-4">
                    <label
                      className="mb-2 block text-sm font-bold text-gray-700"
                      htmlFor="endDate"
                    >
                      Task End Date
                    </label>
                    <input
                      className="focus:shadow-outline w-full appearance-none rounded border py-2 px-3 leading-tight text-gray-700 shadow focus:outline-none"
                      id="endDate"
                      type="date"
                      value={EndDate.toString()}
                      onChange={(e) =>
                        setTask({ ...task, EndDate: e.target.value })
                      }
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <button
                      className="focus:shadow-outline rounded bg-blue-500 py-2 px-4 font-bold text-white hover:bg-blue-700 focus:outline-none"
                      type="button"
                      onClick={addTask}
                    >
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>

            <div className="mt-6 w-96 rounded-xl p-2 focus:text-blue-600">
              <table className="bg-white shadow-lg">
                <tbody>
                  <tr>
                    <th className="border bg-blue-400 px-4 py-4 text-left">
                      S/N
                    </th>
                    <th className="border bg-blue-400 px-8 py-4 text-left">
                      Name
                    </th>
                    <th className="border bg-blue-400 px-8 py-4 text-left">
                      Activity
                    </th>
                    <th className="border bg-blue-400 px-14 py-4 text-left">
                      Start Date
                    </th>
                    <th className="border bg-blue-400 px-16 py-4 text-left">
                      End Date
                    </th>
                    <th className="border bg-blue-400 px-4 py-4 text-left">
                      Action
                    </th>
                  </tr>
                  {task &&
                    tasks.map((task, index) => (
                      <tr key={task.id}>
                        <td className="border px-4 py-4">{index + 1}</td>
                        <td className="border px-4 py-4">{task.Name}</td>
                        <td className="border px-4 py-4">{task.Activity}</td>
                        <td className="border px-4 py-4">{task.StartDate}</td>
                        <td className="border px-4 py-4">{task.EndDate}</td>
                        <td className="border px-4 py-4">
                          {' '}
                          <button
                            className="focus:shadow-outline rounded bg-red-500 py-2 px-4 font-bold text-white hover:bg-red-700 focus:outline-none"
                            type="button"
                            onClick={() => deleteTask(task.id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default Home
