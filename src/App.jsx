import { useEffect, useMemo, useState } from 'react'
import { BrowserRouter, Routes, Route, Link, useNavigate } from 'react-router-dom'
import { Home, Stethoscope, History as HistoryIcon, Hospital, Upload, Languages, LogOut, UserPlus, LogIn, Map, Activity } from 'lucide-react'

const t = (lang) => ({
  en: {
    appName: 'Deepneumoscan',
    welcome: 'Welcome',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email',
    password: 'Password',
    name: 'Name',
    age: 'Age',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    language: 'Language',
    logout: 'Logout',
    home: 'Home',
    selfAssessment: 'Self Assessment',
    xrayScan: 'Chest X-ray Scan',
    hospitalTracker: 'Hospital Tracker',
    history: 'History',
    curingAssessment: 'Curing Assessment',
    medicalBg: 'A medical-themed experience',
    uploadJpeg: 'Upload JPEG X-ray',
    submit: 'Submit',
    directions: 'Get Directions',
  },
  kn: {
    appName: 'ಡೀಪ್ ನ್ಯುಮೊಸ್ಕ್ಯಾನ್',
    welcome: 'ಸ್ವಾಗತ',
    login: 'ಲಾಗಿನ್',
    signup: 'ಸೈನ್ ಅಪ್',
    email: 'ಇಮೇಲ್',
    password: 'ಪಾಸ್ವರ್ಡ್',
    name: 'ಹೆಸರು',
    age: 'ವಯಸ್ಸು',
    gender: 'ಲಿಂಗ',
    male: 'ಪುರುಷ',
    female: 'ಮಹಿಳೆ',
    other: 'ಇತರೆ',
    language: 'ಭಾಷೆ',
    logout: 'ಲಾಗ್ ಔಟ್',
    home: 'ಮುಖಪುಟ',
    selfAssessment: 'ಸ್ವಯಂ ಮೌಲ್ಯಮಾಪನ',
    xrayScan: 'ಛಾತಿ ಎಕ್ಸ್-ರೇ ಸ್ಕ್ಯಾನ್',
    hospitalTracker: 'ಆಸ್ಪತ್ರೆ ಟ್ರ್ಯಾಕರ್',
    history: 'ಇತಿಹಾಸ',
    curingAssessment: 'ಚಿಕಿತ್ಸಾ ಮೌಲ್ಯಮಾಪನ',
    medicalBg: 'ವೈದ್ಯಕೀಯ ಥೀಮ್ ಅನುಭವ',
    uploadJpeg: 'JPEG ಎಕ್ಸ್-ರೇ ಅಪ್ಲೋಡ್ ಮಾಡಿ',
    submit: 'ಸಲ್ಲಿಸು',
    directions: 'ದಿಕ್ಕು ಪಡೆಯಿರಿ',
  }
})[lang]

const API = import.meta.env.VITE_BACKEND_URL || ''

function useLocalStorage(key, initial) {
  const [val, setVal] = useState(() => {
    const raw = localStorage.getItem(key)
    return raw ? JSON.parse(raw) : initial
  })
  useEffect(() => localStorage.setItem(key, JSON.stringify(val)), [key, val])
  return [val, setVal]
}

function Layout({ children }) {
  const [user, setUser] = useLocalStorage('user', null)
  const [lang, setLang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const navigate = useNavigate()

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-900 via-slate-900 to-slate-900 text-white">
      <header className="backdrop-blur bg-white/5 border-b border-white/10 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center gap-3">
          <div className="font-bold text-xl">{tr.appName}</div>
          <nav className="flex-1 flex gap-4">
            {user && (
              <>
                <Link className="hover:text-cyan-300 flex items-center gap-1" to="/home"><Home size={16}/> {tr.home}</Link>
                <Link className="hover:text-cyan-300 flex items-center gap-1" to="/self"><Stethoscope size={16}/> {tr.selfAssessment}</Link>
                <Link className="hover:text-cyan-300 flex items-center gap-1" to="/scan"><Upload size={16}/> {tr.xrayScan}</Link>
                <Link className="hover:text-cyan-300 flex items-center gap-1" to="/hospitals"><Hospital size={16}/> {tr.hospitalTracker}</Link>
                <Link className="hover:text-cyan-300 flex items-center gap-1" to="/curing"><Activity size={16}/> {tr.curingAssessment}</Link>
                <Link className="hover:text-cyan-300 flex items-center gap-1" to="/history"><HistoryIcon size={16}/> {tr.history}</Link>
              </>
            )}
          </nav>
          <div className="flex items-center gap-2">
            <select className="bg-white/10 rounded px-2 py-1" value={lang} onChange={e=>setLang(e.target.value)}>
              <option value="en">English</option>
              <option value="kn">ಕನ್ನಡ</option>
            </select>
            {user ? (
              <button className="px-3 py-1 bg-red-500/80 rounded hover:bg-red-500 flex items-center gap-1" onClick={()=>{setUser(null); navigate('/')}}><LogOut size={16}/> {tr.logout}</button>
            ) : (
              <div className="flex gap-2">
                <Link className="px-3 py-1 bg-cyan-500/80 rounded hover:bg-cyan-500 flex items-center gap-1" to="/"><LogIn size={16}/> {tr.login}</Link>
                <Link className="px-3 py-1 bg-emerald-500/80 rounded hover:bg-emerald-500 flex items-center gap-1" to="/signup"><UserPlus size={16}/> {tr.signup}</Link>
              </div>
            )}
          </div>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6">{children}</main>
    </div>
  )
}

function Login() {
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const [, setUser] = useLocalStorage('user', null)
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      const res = await fetch(`${API}/auth/login`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({email, password})})
      if(!res.ok) throw new Error('Login failed')
      const data = await res.json()
      setUser(data)
      navigate('/home')
    }catch(err){ setError(err.message)}
  }

  return (
    <Layout>
      <div className="grid md:grid-cols-2 gap-8 items-center">
        <div>
          <h1 className="text-3xl font-bold mb-2">{tr.appName}</h1>
          <p className="text-white/70 mb-6">{tr.medicalBg}</p>
          <img src="https://images.unsplash.com/photo-1584438784894-089d6a62b8fa?q=80&w=1200&auto=format&fit=crop" alt="medical" className="rounded-xl border border-white/10 shadow"/>
        </div>
        <form onSubmit={onSubmit} className="bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><LogIn size={18}/> {tr.login}</h2>
          <label className="block mb-2 text-sm">{tr.email}</label>
          <input className="w-full mb-3 px-3 py-2 rounded bg-white/10" value={email} onChange={e=>setEmail(e.target.value)} required/>
          <label className="block mb-2 text-sm">{tr.password}</label>
          <input type="password" className="w-full mb-4 px-3 py-2 rounded bg-white/10" value={password} onChange={e=>setPassword(e.target.value)} required/>
          {error && <div className="text-red-300 text-sm mb-2">{error}</div>}
          <button className="w-full bg-cyan-600 hover:bg-cyan-500 rounded py-2">{tr.login}</button>
          <div className="text-sm mt-3 opacity-80">No account? <Link to="/signup" className="underline">{tr.signup}</Link></div>
        </form>
      </div>
    </Layout>
  )
}

function Signup(){
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const [, setUser] = useLocalStorage('user', null)
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [password,setPassword] = useState('')
  const [language,setLanguage]= useState(lang)
  const navigate = useNavigate()
  const [error, setError] = useState('')

  const onSubmit = async (e)=>{
    e.preventDefault()
    setError('')
    try{
      const res = await fetch(`${API}/auth/signup`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({name,email,password,language})})
      if(!res.ok) throw new Error('Signup failed')
      const data = await res.json()
      setUser({user_id:data.user_id, name, language})
      navigate('/home')
    }catch(err){ setError(err.message)}
  }

  return (
    <Layout>
      <form onSubmit={onSubmit} className="max-w-md mx-auto bg-white/5 p-6 rounded-xl border border-white/10 backdrop-blur">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2"><UserPlus size={18}/> {tr.signup}</h2>
        <label className="block mb-2 text-sm">{tr.name}</label>
        <input className="w-full mb-3 px-3 py-2 rounded bg-white/10" value={name} onChange={e=>setName(e.target.value)} required/>
        <label className="block mb-2 text-sm">{tr.email}</label>
        <input className="w-full mb-3 px-3 py-2 rounded bg-white/10" value={email} onChange={e=>setEmail(e.target.value)} required/>
        <label className="block mb-2 text-sm">{tr.password}</label>
        <input type="password" className="w-full mb-4 px-3 py-2 rounded bg-white/10" value={password} onChange={e=>setPassword(e.target.value)} required/>
        <label className="block mb-2 text-sm">{tr.language}</label>
        <select className="w-full mb-4 px-3 py-2 rounded bg-white/10" value={language} onChange={e=>setLanguage(e.target.value)}>
          <option value="en">English</option>
          <option value="kn">ಕನ್ನಡ</option>
        </select>
        {error && <div className="text-red-300 text-sm mb-2">{error}</div>}
        <button className="w-full bg-emerald-600 hover:bg-emerald-500 rounded py-2">{tr.signup}</button>
      </form>
    </Layout>
  )
}

function HomePage(){
  const [user] = useLocalStorage('user', null)
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  return (
    <Layout>
      <h1 className="text-3xl font-bold mb-6">{tr.welcome} {user?.name}</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <Card to="/self" icon={<Stethoscope/>} title={tr.selfAssessment} />
        <Card to="/scan" icon={<Upload/>} title={tr.xrayScan} />
        <Card to="/hospitals" icon={<Hospital/>} title={tr.hospitalTracker} />
        <Card to="/history" icon={<HistoryIcon/>} title={tr.history} />
        <Card to="/curing" icon={<Activity/>} title={tr.curingAssessment} />
      </div>
    </Layout>
  )
}

function Card({to, icon, title}){
  return (
    <Link to={to} className="p-6 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition flex items-center gap-3">
      <div className="p-2 bg-cyan-500/20 rounded text-cyan-300">{icon}</div>
      <div className="font-semibold">{title}</div>
    </Link>
  )
}

function SelfAssessment(){
  const [user] = useLocalStorage('user', null)
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const [answers, setAnswers] = useState({fever:0, cough:0, shortness_of_breath:0, chest_pain:0, fatigue:0})
  const [res,setRes] = useState(null)
  const submit = async()=>{
    const r = await fetch(`${API}/self-assessment`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id:user.user_id, language:lang, answers})})
    setRes(await r.json())
  }
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">{tr.selfAssessment}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {Object.keys(answers).map(k=> (
            <div key={k}>
              <label className="block text-sm mb-1">{k.replaceAll('_',' ')}</label>
              <input type="range" min="0" max="3" value={answers[k]} onChange={e=>setAnswers(a=>({...a,[k]:Number(e.target.value)}))} className="w-full"/>
            </div>
          ))}
          <button onClick={submit} className="px-4 py-2 bg-cyan-600 rounded">{tr.submit}</button>
        </div>
        <div>
          {res && (
            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="font-semibold mb-1">{res.label} ({(res.confidence*100).toFixed(1)}%)</div>
              <div className="opacity-80">{res.message}</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

function XrayScan(){
  const [user] = useLocalStorage('user', null)
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const [form, setForm] = useState({name:'', age:'', gender:'male', medical_condition:''})
  const [file, setFile] = useState(null)
  const [res,setRes] = useState(null)
  const submit = async()=>{
    const fd = new FormData()
    fd.append('user_id', user.user_id)
    fd.append('name', form.name)
    fd.append('age', form.age)
    fd.append('gender', form.gender)
    fd.append('medical_condition', form.medical_condition)
    fd.append('language', lang)
    fd.append('file', file)
    const r = await fetch(`${API}/xray/scan`, {method:'POST', body: fd})
    setRes(await r.json())
  }
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">{tr.xrayScan}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          <Text label={tr.name} value={form.name} onChange={v=>setForm(f=>({...f,name:v}))} />
          <Text label={tr.age} type="number" value={form.age} onChange={v=>setForm(f=>({...f,age:v}))} />
          <div>
            <label className="block text-sm mb-1">{tr.gender}</label>
            <select className="w-full px-3 py-2 rounded bg-white/10" value={form.gender} onChange={e=>setForm(f=>({...f,gender:e.target.value}))}>
              <option value="male">{tr.male}</option>
              <option value="female">{tr.female}</option>
              <option value="other">{tr.other}</option>
            </select>
          </div>
          <Text label="Medical Condition" value={form.medical_condition} onChange={v=>setForm(f=>({...f,medical_condition:v}))} />
          <div>
            <label className="block text-sm mb-1">{tr.uploadJpeg}</label>
            <input type="file" accept="image/jpeg" onChange={e=>setFile(e.target.files?.[0])} />
          </div>
          <button disabled={!file} onClick={submit} className="px-4 py-2 bg-cyan-600 rounded disabled:opacity-50">{tr.submit}</button>
        </div>
        <div>
          {res && (
            <div className="space-y-3">
              <div className="p-4 bg-white/5 rounded border border-white/10">
                <div className="font-semibold mb-1">{res.label} ({(res.confidence*100).toFixed(1)}%)</div>
                <div className="opacity-80">{res.message}</div>
              </div>
              {res.annotated_image_path && (
                <img src={`${API}/${res.annotated_image_path}`} alt="annotated" className="rounded"/>
              )}
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

function Text({label, value, onChange, type='text'}){
  return (
    <div>
      <label className="block text-sm mb-1">{label}</label>
      <input type={type} className="w-full px-3 py-2 rounded bg-white/10" value={value} onChange={e=>onChange(e.target.value)} />
    </div>
  )
}

function Curing(){
  const [user] = useLocalStorage('user', null)
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const [inputs, setInputs] = useState({fever:1, cough:1, breath:1, energy:1})
  const [res, setRes] = useState(null)
  const submit = async()=>{
    const r = await fetch(`${API}/curing-assessment`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({user_id:user.user_id, language:lang, inputs})})
    setRes(await r.json())
  }
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">{tr.curingAssessment}</h2>
      <div className="grid md:grid-cols-2 gap-6">
        <div className="space-y-3">
          {Object.keys(inputs).map(k=> (
            <div key={k}>
              <label className="block text-sm mb-1">{k.replaceAll('_',' ')}</label>
              <input type="range" min="0" max="3" value={inputs[k]} onChange={e=>setInputs(a=>({...a,[k]:Number(e.target.value)}))} className="w-full"/>
            </div>
          ))}
          <button onClick={submit} className="px-4 py-2 bg-cyan-600 rounded">{tr.submit}</button>
        </div>
        <div>
          {res && (
            <div className="p-4 bg-white/5 rounded border border-white/10">
              <div className="font-semibold mb-1">{res.status}</div>
              <div className="opacity-80">{res.message}</div>
            </div>
          )}
        </div>
      </div>
    </Layout>
  )
}

function History(){
  const [user] = useLocalStorage('user', null)
  const [items, setItems] = useState([])
  const load = async()=>{
    const r = await fetch(`${API}/history/${user.user_id}`)
    const d = await r.json(); setItems(d.items || [])
  }
  useEffect(()=>{load()},[])
  const del = async(id)=>{
    await fetch(`${API}/history/${user.user_id}/${id}`, {method:'DELETE'})
    load()
  }
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">History</h2>
      <div className="space-y-3">
        {items.map(it=> (
          <div key={it._id} className="p-3 rounded bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="text-sm opacity-80">{it.item_type}</div>
              <div className="font-medium">{it.summary}</div>
            </div>
            <button onClick={()=>del(it._id)} className="px-3 py-1 bg-red-600 rounded">Delete</button>
          </div>
        ))}
      </div>
    </Layout>
  )
}

function Hospitals(){
  const [lang] = useLocalStorage('lang', 'en')
  const tr = t(lang)
  const [loc, setLoc] = useState(null)
  const [list, setList] = useState([])
  const find = ()=>{
    navigator.geolocation.getCurrentPosition(async (pos)=>{
      const {latitude:lat, longitude:lng} = pos.coords
      setLoc({lat,lng})
      const r = await fetch(`${API}/hospitals`, {method:'POST', headers:{'Content-Type':'application/json'}, body: JSON.stringify({lat,lng})})
      const d = await r.json(); setList(d.hospitals)
    })
  }
  useEffect(()=>{find()},[])
  return (
    <Layout>
      <h2 className="text-xl font-semibold mb-4">{tr.hospitalTracker}</h2>
      <div className="space-y-3">
        {list.map((h,i)=>(
          <div key={i} className="p-3 rounded bg-white/5 border border-white/10 flex items-center justify-between">
            <div>
              <div className="font-medium">{h.name}</div>
              <div className="text-sm opacity-80">{h.distance_km.toFixed(2)} km</div>
            </div>
            <a className="px-3 py-1 bg-cyan-600 rounded" href={h.directions_url} target="_blank" rel="noreferrer">{tr.directions}</a>
          </div>
        ))}
      </div>
    </Layout>
  )
}

export default function AppRouter(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>} />
        <Route path="/signup" element={<Signup/>} />
        <Route path="/home" element={<HomePage/>} />
        <Route path="/self" element={<SelfAssessment/>} />
        <Route path="/scan" element={<XrayScan/>} />
        <Route path="/curing" element={<Curing/>} />
        <Route path="/history" element={<History/>} />
      </Routes>
    </BrowserRouter>
  )
}
