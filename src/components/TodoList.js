import { useEffect, useState } from "react";

 export default function TodoList() { 
 const [tasks, setTasks] = useState(() => {
    if (typeof window === "undefined") {
  return [
   { id: 1, text: "Read Books", done: false },
 { id: 2, text: "cook at noon", done: false },
  ];
    } 
    const saved = localStorage.getItem("tasks");
    return saved
    ? JSON.parse(saved) 
    : [
       { id: 1, text: "Read Books", done: false },
 { id: 2, text: "cook at noon", done: false },
    ];
 });
 const [newTask, setNewTask] = useState("");
 const [filter, setFilter] = useState("all"); 
 const [editingId, setEditingId] = useState(null);
 const [editingText, setEditingText] = useState("");

 const [dragIndex, setDragIndex] = useState(null);
 const [dark, setDark] = useState(false);
 // Load
 useEffect(() => {
   if (typeof window === "undefined") return;
 const savedTheme = localStorage.getItem("dark");
 if (savedTheme !== null) {
 setDark(savedTheme === "true");
 } 
 }, []); 
 // Save
 useEffect(() => {
    if (typeof window === "undefined") return;
 localStorage.setItem("tasks", JSON.stringify(tasks));
 }, [tasks]);
 useEffect(() => {
    if (typeof window === "undefined") return;
 localStorage.setItem("dark", dark); 
 }, [dark]); 
 const addTask = () => {
 if (!newTask.trim()) return;

 setTasks([
 ...tasks,
 { id: Date.now(), text: newTask.trim(), done: false },
 ]); 
 setNewTask("");
 };
 const toggleTask = (id) => {
 setTasks(
 tasks.map((t) =>
  t.id === id ? { ...t, done: !t.done } : t
 )
 ); 
 };

 const deleteTask = (id) => {
 setTasks(tasks.filter((t) => t.id !== id));
 }; 
 const startEdit = (task) => {
 setEditingId(task.id);
 setEditingText(task.text);
 };
 const saveEdit = (id) => {
 if (!editingText.trim()) return;
 setTasks(
 tasks.map((t) =>
  t.id === id ? { ...t, text: editingText.trim() } : t
 ) 
 );
 setEditingId(null); 
 setEditingText("");
 };
 // ---------- Drag & Drop reorder ---------- 
 const handleDrop = (dropIndex) => {
 if (dragIndex === null) return;
 const copy = [...tasks];
 const item = copy[dragIndex];
 copy.splice(dragIndex, 1); 
 copy.splice(dropIndex, 0, item);
 setTasks(copy);
 setDragIndex(null); 
 };
 const filteredTasks = tasks.filter((task) => {
 if (filter === "active") return !task.done;
 if (filter === "done") return task.done; 
 return true;
 });
 const doneCount = tasks.filter((t) => t.done).length;
 return ( 
 <div
 className={`min-h-screen flex items-center justify-center p-4 transition-colors ${
 dark 
 ? "bg-slate-900 text-white"
 : "bg-gradient-to-br from-slate-100 to-slate-200"
 }`} > 
 <div 
 className={`w-full max-w-md rounded-2xl shadow-lg p-6 transition-colors 
 ${dark ? "bg-slate-800" : "bg-white  text-gray-400"}`} > 
 {/* Header */}
 <div className="flex justify-between items-center mb-2">
 <h1 className="text-2xl font-bold">My To-Do List</h1>
 <button onClick={() => setDark(!dark)}
 className="text-sm px-3 py-1 rounded-full border hover:opacity-80" >
 {dark ? "☀️ Light" : "🌙 Dark"}
 </button>
 </div>
 <p className="text-sm text-center mb-4 text-gray-400">
 {doneCount} / {tasks.length} completed </p> 
 {/* Add */} 
 <div className="flex gap-2 mb-4"> 
 <input value={newTask} 
 onChange={(e) => setNewTask(e.target.value)} 
 onKeyDown={(e) => e.key === "Enter" && addTask()}
 placeholder="Add a new task..."
 className="flex-1 px-3 py-2 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-400 text-black" /> 
 <button onClick={addTask} className="bg-blue-500 hover:bg-blue-600 text-white px-4 rounded-lg transition" >
 Add
 </button>
 </div> 
 {/* Filters */}
 <div className="flex justify-between mb-4 text-sm"> 
 {["all", "active", "done"].map((f) => (
 <button
 key={f} 
 onClick={() => setFilter(f)} 
 className={`px-3 py-1 rounded-full capitalize transition 
 ${
 filter === f 
 ? "bg-blue-500 text-white"
 : "bg-gray-200 text-gray-700"
 }`} > 
 {f} 
 </button>
 ))} 
 </div>
 {/* List */} 
 <ul className="space-y-2"> 
 {filteredTasks.length === 0 && (
 <li className="text-center text-gray-400 py-6"> No tasks here ✨ </li>
 )}
 {filteredTasks.map((task, index) => ( 
 <li
 key={task.id}
 draggable onDragStart={() => setDragIndex(index)} 
 onDragOver={(e) => e.preventDefault()} 
 onDrop={() => handleDrop(index)}
 className={`flex items-center gap-3 p-3 rounded-lg border cursor-move transition-all duration-200 hover:scale-[1.01] 
 ${dark ? "border-slate-700" : ""} `} >
 <input
 type="checkbox" 
 checked={task.done}
 onChange={() => toggleTask(task.id)} /> 
 {editingId === task.id ? ( 
 <input value={editingText}
 onChange={(e) => setEditingText(e.target.value)} 
 onKeyDown={(e) =>
 e.key === "Enter" && saveEdit(task.id) 
 }
 className="flex-1 px-2 py-1 rounded border text-black"
 autoFocus />
 ) : ( 
 <span 
 className={`flex-1 transition-all 
 ${
 task.done ?
 "line-through text-gray-400"
 : "" 
 }`} >
 {task.text}
 </span> 
 )} 
 {editingId === task.id ? ( 
 <button
 onClick={() => saveEdit(task.id)}
 className="text-blue-400 text-sm"
 > Save 
 </button> 
 ) : ( 
 <button onClick={() => startEdit(task)}
 className="text-gray-400 text-sm"
 > Edit
 </button> 
 )} 
 <button onClick={() => 
deleteTask(task.id)} 
 className="text-red-400 text-sm" 
 > Delete
 </button>
 </li> 
 ))} 
 </ul>
 <p className="mt-4 text-xs text-center text-gray-400"> 
 Tip: drag tasks to reorder 👆 </p>
 <div className="mt-4 text-xs text-center text-gray-400">Roniblaq dev</div>
 </div>
 </div>
 );
 }