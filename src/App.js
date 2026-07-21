import { useState, useEffect } from "react";
import { supabase } from "./supabase";

const NAVY = "#0A1628";
const TEAL = "#0F9E75";
const TEAL_LIGHT = "#E6F7F2";
const CORAL = "#E03E2A";
const AMBER = "#D97706";
const SLATE = "#64748B";
const BORDER = "#E2E8F0";
const SURFACE = "#F8FAFC";

function CirrusLogo({ size = 28, white = false }) {
  const t = white ? "#0F9E75" : TEAL;
  return (
    <svg width={size} height={size} viewBox="0 0 32 32" fill="none">
      <rect width="32" height="32" rx="9" fill={white ? "rgba(255,255,255,0.12)" : TEAL_LIGHT} />
      <path d="M7 20 C7 20 8.5 14.5 13 14.5 C14.5 14.5 15.5 15.3 16 16 C16.5 14.7 18 12.5 21 12.5 C24.5 12.5 26 15.5 26 17.5 C27 17.7 28 18.7 28 20" stroke={t} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M4 22 C4 22 6.5 16.5 12 16.5 C13.8 16.5 15.2 17.5 16 18.5 C16.8 17 18.5 15 22 15 C26 15 28 18.5 28 20.5 C29.2 20.8 30 21.8 30 23" stroke={white ? "rgba(255,255,255,0.45)" : "#5DCAA5"} strokeWidth="1.4" strokeLinecap="round" fill="none" />
    </svg>
  );
}
function Wordmark({ white = false, size = 14 }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
      <CirrusLogo white={white} size={size + 12} />
      <span style={{ fontFamily: "'Trebuchet MS', sans-serif", fontWeight: 300, fontSize: size, letterSpacing: "0.22em", color: white ? "#fff" : NAVY, textTransform: "uppercase" }}>Cirrus</span>
    </div>
  );
}
function Stars({ val, size = 12 }) {
  const v = parseFloat(val) || 0;
  return <span style={{ fontSize: size, letterSpacing: -0.5 }}><span style={{ color: "#F59E0B" }}>{"★".repeat(Math.floor(v))}</span><span style={{ color: "#E2E8F0" }}>{"★".repeat(5 - Math.floor(v))}</span><span style={{ color: SLATE, fontSize: size - 1, marginLeft: 3 }}>{v.toFixed(1)}</span></span>;
}
function Badge({ urgencia }) {
  const c = { eletiva: { label: "Eletiva", bg: "#F1F5F9", color: "#475569" }, urgente: { label: "Urgente", bg: "#FEF9C3", color: "#854D0E" }, emergencia: { label: "Emergência", bg: "#FEE2E2", color: "#991B1B" } }[urgencia] || { label: urgencia, bg: "#F1F5F9", color: "#475569" };
  return <span style={{ background: c.bg, color: c.color, fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, letterSpacing: 0.4, whiteSpace: "nowrap" }}>{c.label.toUpperCase()}</span>;
}
function Avatar({ initials = "?", size = 42 }) {
  const map = { C: ["#1E3A5F","#93C5FD"], R: ["#14532D","#86EFAC"], J: ["#4C1D95","#C4B5FD"], M: ["#7C2D12","#FCA5A5"], P: ["#064E3B","#6EE7B7"], D: ["#374151","#9CA3AF"], T: ["#1E3A5F","#93C5FD"], A: ["#14532D","#86EFAC"], B: ["#4C1D95","#C4B5FD"] };
  const [bg, fg] = map[(initials||"?")[0].toUpperCase()] || ["#1E3A5F","#93C5FD"];
  return <div style={{ width: size, height: size, borderRadius: "50%", background: bg, color: fg, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: size * 0.29, flexShrink: 0, letterSpacing: 1 }}>{initials}</div>;
}
function StatusPill({ status }) {
  return <span style={{ display: "inline-flex", alignItems: "center", gap: 5, fontSize: 11, fontWeight: 600, color: status ? TEAL : "#94A3B8" }}><span style={{ width: 6, height: 6, borderRadius: "50%", background: status ? TEAL : "#CBD5E1", display: "inline-block" }} />{status ? "Disponível" : "Ocupado"}</span>;
}
function NavTabs({ tabs, active, onChange }) {
  return <div style={{ display: "flex", borderBottom: "1px solid rgba(255,255,255,0.08)" }}>{tabs.map(([k, l]) => <button key={k} onClick={() => onChange(k)} style={{ flex: 1, background: "none", border: "none", color: active === k ? "#fff" : "rgba(255,255,255,0.38)", fontSize: 11, fontWeight: active === k ? 700 : 400, padding: "9px 0 11px", borderBottom: active === k ? `2px solid ${TEAL}` : "2px solid transparent", cursor: "pointer" }}>{l}</button>)}</div>;
}
function Loading({ msg = "Carregando..." }) {
  return <div style={{ textAlign: "center", padding: "40px 20px", color: SLATE, fontSize: 13 }}>⏳ {msg}</div>;
}
function Vazio({ msg }) {
  return <div style={{ textAlign: "center", padding: "40px 20px", color: "#94A3B8", fontSize: 13 }}>{msg}</div>;
}
function AppHeader({ onBell, onLogout, notifCount = 0 }) {
  return (
    <div style={{ background: NAVY, padding: "14px 18px 0" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
        <Wordmark white />
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <button onClick={onBell} style={{ background: "none", border: "none", cursor: "pointer", position: "relative", padding: 0, fontSize: 18 }}>
            🔔{notifCount > 0 && <span style={{ position: "absolute", top: -4, right: -4, background: CORAL, color: "#fff", fontSize: 9, fontWeight: 800, width: 15, height: 15, borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>{notifCount}</span>}
          </button>
          <button onClick={onLogout} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.4)", fontSize: 11, cursor: "pointer" }}>Sair</button>
        </div>
      </div>
    </div>
  );
}

// ─── CAMPO CIDADES MÚLTIPLAS ──────────────────────────────────────────────────
function CamposCidades({ cidades, onChange }) {
  const [input, setInput] = useState("");
  const adicionar = () => {
    const val = input.trim();
    if (val && !cidades.includes(val)) { onChange([...cidades, val]); setInput(""); }
  };
  const remover = (c) => onChange(cidades.filter(x => x !== c));
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 8 }}>
        <input value={input} onChange={e => setInput(e.target.value)} onKeyDown={e => e.key === "Enter" && adicionar()} placeholder="Ex: Santo André" style={{ flex: 1, padding: "9px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 13, outline: "none" }} />
        <button onClick={adicionar} style={{ padding: "9px 16px", borderRadius: 10, border: "none", background: TEAL, color: "#fff", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>+</button>
      </div>
      {cidades.length > 0 && (
        <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
          {cidades.map(c => <span key={c} style={{ display: "flex", alignItems: "center", gap: 5, background: TEAL_LIGHT, color: TEAL, fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 20 }}>{c}<button onClick={() => remover(c)} style={{ background: "none", border: "none", color: TEAL, cursor: "pointer", fontSize: 14, padding: 0, lineHeight: 1 }}>×</button></span>)}
        </div>
      )}
    </div>
  );
}

// ─── ONBOARDING ───────────────────────────────────────────────────────────────
const PERFIL_CFG = {
  medico:         { label: "Médico",         icon: "🩺", color: "#3B82F6" },
  hospital:       { label: "Hospital",       icon: "🏥", color: TEAL },
  opme:           { label: "Empresa OPME",   icon: "📦", color: AMBER },
  instrumentador: { label: "Instrumentador", icon: "🔬", color: "#7C3AED" },
  intermediador:  { label: "Intermediador",  icon: "👥", color: CORAL },
};

function Onboarding({ onConcluir }) {
  const [step, setStep] = useState(0);
  const [perfilSel, setPerfilSel] = useState(null);
  const [vals, setVals] = useState({});
  const [cidades, setCidades] = useState([]);
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [loading, setLoading] = useState(false);
  const [erro, setErro] = useState("");
  const [loginMode, setLoginMode] = useState(false);

  const inputStyle = { width: "100%", boxSizing: "border-box", padding: "10px 13px", borderRadius: 11, border: `1px solid ${BORDER}`, fontSize: 13, outline: "none" };
  const labelStyle = { fontSize: 10, fontWeight: 700, color: SLATE, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 };

  const handleCadastro = async () => {
    setLoading(true); setErro("");
    try {
      const { data, error } = await supabase.auth.signUp({ email, password: senha });
      if (error) throw error;
      const user = data.user;
      const nome = vals["Nome completo"] || vals["Nome do hospital"] || vals["Nome da empresa"] || email;
      await supabase.from("perfis").insert({ id: user.id, tipo: perfilSel, nome, email, telefone: vals["Telefone"] || null, cidade: cidades.length > 0 ? cidades[0] : (vals["Cidade"] || null) });
      if (perfilSel === "instrumentador") {
        await supabase.from("instrumentadores").insert({ id: user.id, crefito: vals["CREFITO"] || "", especialidades: (vals["Especialidades"] || "").split(",").map(s => s.trim()).filter(Boolean), valor_hora: parseFloat(vals["Valor por cirurgia (R$)"]) || 0, disponivel: true, bio: JSON.stringify({ cidades }) });
      }
      if (perfilSel === "intermediador") await supabase.from("intermediadores").insert({ id: user.id, crefito: vals["CREFITO"] || "", tamanho_rede: 0 });
      if (perfilSel === "medico") await supabase.from("medicos").insert({ id: user.id, crm: vals["CRM"] || "", especialidade: vals["Especialidade"] || "" });
      if (perfilSel === "hospital") await supabase.from("hospitais").insert({ id: user.id, cnpj: vals["CNPJ"] || "", nome_instituicao: vals["Nome do hospital"] || "" });
      if (perfilSel === "opme") await supabase.from("empresas_opme").insert({ id: user.id, cnpj: vals["CNPJ"] || "", nome_empresa: vals["Nome da empresa"] || "", representante: vals["Representante"] || "" });
      onConcluir({ tipo: perfilSel, nome, id: user.id });
    } catch (e) { setErro(e.message || "Erro ao criar conta."); }
    setLoading(false);
  };

  const handleLogin = async () => {
    setLoading(true); setErro("");
    try {
      const { data, error } = await supabase.auth.signInWithPassword({ email, password: senha });
      if (error) throw error;
      const { data: perfil } = await supabase.from("perfis").select("*").eq("id", data.user.id).single();
      onConcluir({ tipo: perfil?.tipo || "medico", nome: perfil?.nome || email, id: data.user.id });
    } catch (e) { setErro(e.message || "E-mail ou senha incorretos."); }
    setLoading(false);
  };

  const camposPorPerfil = {
    medico: [["CRM","text","CRM/SP 123456"],["Nome completo","text","Dr. João Silva"],["Especialidade","text","Cardiologia"],["Telefone","tel","(11) 9 9999-9999"]],
    hospital: [["CNPJ","text","00.000.000/0001-00"],["Nome do hospital","text","Hospital São Lucas"],["Telefone","tel","(11) 3000-0000"]],
    opme: [["CNPJ","text","00.000.000/0001-00"],["Nome da empresa","text","TechSpine Brasil"],["Representante","text","Maria Oliveira"]],
    instrumentador: [["CREFITO","text","CREFITO-3 123456"],["Nome completo","text","Carla Mendonça"],["Especialidades","text","Ortopedia, Coluna"],["Valor por cirurgia (R$)","number","800"]],
    intermediador: [["CREFITO","text","CREFITO-3 123456"],["Nome completo","text","Ricardo Lima"]],
  };

  if (loginMode) return (
    <div style={{ minHeight: 700, display: "flex", flexDirection: "column" }}>
      <div style={{ background: NAVY, padding: "52px 24px 36px", textAlign: "center" }}><CirrusLogo size={52} white /><p style={{ fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 300, fontSize: 20, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase", margin: "12px 0 0" }}>Cirrus</p></div>
      <div style={{ flex: 1, padding: "28px 18px 32px", background: SURFACE, display: "flex", flexDirection: "column", gap: 13 }}>
        <p style={{ fontWeight: 700, fontSize: 16, color: NAVY, margin: "0 0 4px" }}>Entrar na sua conta</p>
        <div><label style={labelStyle}>E-mail</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com.br" style={inputStyle} /></div>
        <div><label style={labelStyle}>Senha</label><input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Sua senha" style={inputStyle} /></div>
        {erro && <p style={{ color: CORAL, fontSize: 12, margin: 0 }}>{erro}</p>}
        <button onClick={handleLogin} disabled={loading} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>{loading ? "Entrando..." : "Entrar →"}</button>
        <p style={{ textAlign: "center", fontSize: 12, color: SLATE }}>Não tem conta? <span style={{ color: TEAL, fontWeight: 700, cursor: "pointer" }} onClick={() => { setLoginMode(false); setErro(""); }}>Criar conta</span></p>
      </div>
    </div>
  );

  if (step === 1 && perfilSel) {
    const campos = camposPorPerfil[perfilSel] || [];
    const cfg = PERFIL_CFG[perfilSel];
    const precisaCidades = ["instrumentador","intermediador"].includes(perfilSel);
    return (
      <div>
        <div style={{ background: NAVY, padding: "20px 20px 24px" }}>
          <button onClick={() => setStep(0)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.45)", fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 16 }}>← Voltar</button>
          <div style={{ width: 42, height: 42, borderRadius: 12, background: `${cfg.color}25`, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 10, fontSize: 22 }}>{cfg.icon}</div>
          <p style={{ color: "#fff", fontWeight: 700, fontSize: 17, margin: "0 0 3px" }}>Criar conta</p>
          <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 12, margin: 0 }}>Perfil: {cfg.label}</p>
        </div>
        <div style={{ padding: "20px 18px 32px", background: SURFACE, display: "flex", flexDirection: "column", gap: 13 }}>
          {campos.map(([label, type, placeholder]) => <div key={label}><label style={labelStyle}>{label}</label><input type={type} placeholder={placeholder} value={vals[label] || ""} onChange={e => setVals(p => ({ ...p, [label]: e.target.value }))} style={inputStyle} /></div>)}
          {precisaCidades && <div><label style={labelStyle}>Cidades de atuação</label><CamposCidades cidades={cidades} onChange={setCidades} /></div>}
          {!precisaCidades && <div><label style={labelStyle}>Cidade</label><input type="text" placeholder="São Paulo" value={vals["Cidade"] || ""} onChange={e => setVals(p => ({ ...p, Cidade: e.target.value }))} style={inputStyle} /></div>}
          <div><label style={labelStyle}>E-mail</label><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="seu@email.com.br" style={inputStyle} /></div>
          <div><label style={labelStyle}>Senha</label><input type="password" value={senha} onChange={e => setSenha(e.target.value)} placeholder="Mínimo 8 caracteres" style={inputStyle} /></div>
          {erro && <p style={{ color: CORAL, fontSize: 12, margin: 0 }}>{erro}</p>}
          <p style={{ fontSize: 11, color: "#94A3B8", margin: 0, lineHeight: 1.5 }}>Ao continuar, você concorda com os Termos de Uso e a Política de Privacidade da Cirrus.</p>
          <button onClick={handleCadastro} disabled={loading} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: loading ? 0.7 : 1 }}>{loading ? "Criando conta..." : "Criar minha conta →"}</button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: 700, display: "flex", flexDirection: "column" }}>
      <div style={{ background: NAVY, padding: "52px 24px 36px", textAlign: "center" }}><CirrusLogo size={52} white /><p style={{ fontFamily: "'Trebuchet MS',sans-serif", fontWeight: 300, fontSize: 20, letterSpacing: "0.28em", color: "#fff", textTransform: "uppercase", margin: "12px 0 6px" }}>Cirrus</p><p style={{ color: "rgba(255,255,255,0.35)", fontSize: 12, margin: 0 }}>Instrumentação cirúrgica conectada</p></div>
      <div style={{ flex: 1, padding: "24px 18px 32px", background: SURFACE }}>
        <p style={{ fontWeight: 700, fontSize: 15, color: NAVY, margin: "0 0 4px" }}>Bem-vindo!</p>
        <p style={{ fontSize: 13, color: SLATE, margin: "0 0 20px" }}>Selecione seu perfil para começar.</p>
        <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
          {Object.entries(PERFIL_CFG).map(([key, c]) => <button key={key} onClick={() => { setPerfilSel(key); setStep(1); setCidades([]); setVals({}); }} style={{ display: "flex", alignItems: "center", gap: 14, background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "13px 16px", cursor: "pointer", textAlign: "left" }} onMouseEnter={e => e.currentTarget.style.borderColor = c.color} onMouseLeave={e => e.currentTarget.style.borderColor = BORDER}><div style={{ width: 40, height: 40, borderRadius: 11, background: `${c.color}18`, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0, fontSize: 20 }}>{c.icon}</div><p style={{ fontWeight: 700, fontSize: 14, color: NAVY, margin: 0, flex: 1 }}>{c.label}</p><span style={{ color: "#CBD5E1" }}>›</span></button>)}
        </div>
        <p style={{ textAlign: "center", fontSize: 12, color: SLATE }}>Já tem conta? <span style={{ color: TEAL, fontWeight: 700, cursor: "pointer" }} onClick={() => { setLoginMode(true); setErro(""); }}>Entrar</span></p>
      </div>
    </div>
  );
}

// ─── VISÃO CONTRATANTE ────────────────────────────────────────────────────────
function VisaoContratante({ usuario, perfil }) {
  const [tab, setTab] = useState("buscar");
  const [instrumentadores, setInstrumentadores] = useState([]);
  const [chamados, setChamados] = useState([]);
  const [loadingInstr, setLoadingInstr] = useState(true);
  const [loadingChamados, setLoadingChamados] = useState(false);
  const [busca, setBusca] = useState("");
  const [filtroEsp, setFiltroEsp] = useState("Todas");
  const [solicitado, setSolicitado] = useState(null);
  const [form, setForm] = useState({ cirurgia: "", especialidade: "Ortopedia", data: "", hora: "", urgencia: "eletiva", obs: "" });
  const [salvando, setSalvando] = useState(false);
  const [formOk, setFormOk] = useState(false);
  const esps = ["Todas","Ortopedia","Cardiovascular","Neurologia","Coluna","Oncologia","Urologia","Geral"];
  const meta = { medico: { label: "Médico", color: "#3B82F6" }, hospital: { label: "Hospital", color: TEAL }, opme: { label: "OPME", color: AMBER } }[perfil] || { label: perfil, color: SLATE };
  const inputStyle = { width: "100%", boxSizing: "border-box", padding: "9px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 13, outline: "none", background: "#fff" };
  const labelStyle = { fontSize: 10, fontWeight: 700, color: SLATE, display: "block", marginBottom: 5, textTransform: "uppercase", letterSpacing: 0.5 };
  const getIniciais = (nome = "") => nome.split(" ").map(n => n[0]).join("").slice(0, 2).toUpperCase();

  useEffect(() => {
    const buscarInstrumentadores = async () => {
      setLoadingInstr(true);
      const { data } = await supabase.from("instrumentadores").select("*, perfis(nome, cidade)").order("avaliacao_media", { ascending: false });
      if (data) setInstrumentadores(data);
      setLoadingInstr(false);
    };
    buscarInstrumentadores();
  }, []);

  useEffect(() => {
    if (tab !== "historico") return;
    const buscarChamados = async () => {
      setLoadingChamados(true);
      const { data } = await supabase.from("chamados").select("*").eq("solicitante_id", usuario.id).order("criado_em", { ascending: false });
      if (data) setChamados(data);
      setLoadingChamados(false);
    };
    buscarChamados();
  }, [tab, usuario.id]);

  // Realtime: atualiza status dos chamados automaticamente
  useEffect(() => {
    const canal = supabase.channel("chamados-contratante")
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chamados", filter: `solicitante_id=eq.${usuario.id}` }, payload => {
        setChamados(prev => prev.map(c => c.id === payload.new.id ? { ...c, ...payload.new } : c));
      }).subscribe();
    return () => supabase.removeChannel(canal);
  }, [usuario.id]);

  const filtrados = instrumentadores.filter(p => {
    const nome = p.perfis?.nome || "";
    const b = nome.toLowerCase().includes(busca.toLowerCase()) || (p.especialidades || []).join(" ").toLowerCase().includes(busca.toLowerCase());
    const e = filtroEsp === "Todas" || (p.especialidades || []).includes(filtroEsp);
    return b && e;
  });

  const handleSolicitar = async () => {
    setSalvando(true);
    const dataHora = form.data && form.hora ? new Date(`${form.data}T${form.hora}`) : new Date();
    const valor = solicitado ? (solicitado.valor_hora || 0) : 0;
    const { error } = await supabase.from("chamados").insert({
      solicitante_id: usuario.id, tipo_solicitante: perfil,
      cirurgia: form.cirurgia || "A definir", especialidade: form.especialidade,
      data_procedimento: dataHora.toISOString(), duracao_horas: 1,
      urgencia: form.urgencia, observacoes: form.obs,
      valor_ofertado: valor, instrumentador_id: solicitado?.id || null, status: "aberto"
    });
    setSalvando(false);
    if (!error) { setFormOk(true); setSolicitado(null); }
    else alert("Erro ao salvar: " + error.message);
  };

  const handlePublicar = async () => {
    setSalvando(true);
    const dataHora = form.data && form.hora ? new Date(`${form.data}T${form.hora}`) : new Date();
    const { error } = await supabase.from("chamados").insert({
      solicitante_id: usuario.id, tipo_solicitante: perfil,
      cirurgia: form.cirurgia || "A definir", especialidade: form.especialidade,
      data_procedimento: dataHora.toISOString(), duracao_horas: 1,
      urgencia: form.urgencia, observacoes: form.obs, valor_ofertado: 0, status: "aberto"
    });
    setSalvando(false);
    if (!error) setFormOk(true);
    else alert("Erro: " + error.message);
  };

  const statusCfg = { aberto: { label: "Aberto", bg: "#F1F5F9", color: "#475569" }, aceito: { label: "Aceito ✓", bg: "#DBEAFE", color: "#1E40AF" }, em_andamento: { label: "Em andamento", bg: "#FEF9C3", color: "#854D0E" }, concluido: { label: "Concluído", bg: "#DCFCE7", color: "#166534" }, cancelado: { label: "Cancelado", bg: "#FEE2E2", color: "#991B1B" } };

  return (
    <div>
      <div style={{ background: NAVY, padding: "0 18px 0" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 0 8px" }}>
          <span style={{ background: meta.color, color: "#fff", fontSize: 10, fontWeight: 800, padding: "3px 10px", borderRadius: 20 }}>{meta.label.toUpperCase()}</span>
          <span style={{ color: "rgba(255,255,255,0.4)", fontSize: 11 }}>Olá, {usuario.nome.split(" ")[0]}</span>
        </div>
        <NavTabs tabs={[["buscar","Buscar"],["solicitar","Solicitar"],["historico","Histórico"]]} active={tab} onChange={setTab} />
      </div>
      <div style={{ padding: "14px 16px 80px", background: SURFACE, minHeight: 420 }}>
        {tab === "buscar" && (
          <div>
            <div style={{ position: "relative", marginBottom: 10 }}>
              <span style={{ position: "absolute", left: 11, top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }}>🔍</span>
              <input value={busca} onChange={e => setBusca(e.target.value)} placeholder="Nome ou especialidade..." style={{ ...inputStyle, padding: "9px 12px 9px 33px" }} />
            </div>
            <div style={{ display: "flex", gap: 6, marginBottom: 12, overflowX: "auto", paddingBottom: 2 }}>
              {esps.map(e => <button key={e} onClick={() => setFiltroEsp(e)} style={{ padding: "4px 11px", borderRadius: 20, border: `1px solid ${filtroEsp === e ? TEAL : BORDER}`, background: filtroEsp === e ? TEAL_LIGHT : "#fff", color: filtroEsp === e ? TEAL : SLATE, fontSize: 10, fontWeight: filtroEsp === e ? 700 : 400, cursor: "pointer", whiteSpace: "nowrap" }}>{e}</button>)}
            </div>
            {loadingInstr ? <Loading msg="Buscando instrumentadores..." /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {filtrados.length === 0 && <Vazio msg={instrumentadores.length === 0 ? "Nenhum instrumentador cadastrado ainda." : "Nenhum resultado."} />}
                {filtrados.map(p => {
                  const nome = p.perfis?.nome || "Instrumentador";
                  const cidades = (() => { try { return JSON.parse(p.bio || "{}").cidades || []; } catch { return []; } })();
                  return (
                    <div key={p.id} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 16, padding: "13px 15px" }}>
                      <div style={{ display: "flex", gap: 12 }}>
                        <Avatar initials={getIniciais(nome)} />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <div style={{ display: "flex", justifyContent: "space-between" }}>
                            <div><p style={{ fontWeight: 700, fontSize: 14, color: NAVY, margin: 0 }}>{nome}</p><p style={{ fontSize: 11, color: SLATE, margin: "2px 0 0" }}>{(p.especialidades || []).join(", ") || "Geral"}</p></div>
                            <div style={{ textAlign: "right" }}><p style={{ fontWeight: 700, fontSize: 14, color: NAVY, margin: 0 }}>R$ {p.valor_hora || 0}<span style={{ fontSize: 10, color: "#94A3B8" }}>/cir</span></p>{cidades.length > 0 && <p style={{ fontSize: 10, color: "#94A3B8", margin: "2px 0 0" }}>{cidades.slice(0,2).join(", ")}{cidades.length > 2 ? ` +${cidades.length-2}` : ""}</p>}</div>
                          </div>
                          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: 7 }}>
                            <Stars val={p.avaliacao_media || 0} />
                            <StatusPill status={p.disponivel} />
                          </div>
                          {p.disponivel && <button onClick={() => { setSolicitado(p); setTab("solicitar"); }} style={{ marginTop: 9, width: "100%", padding: "7px 0", borderRadius: 9, border: "none", background: NAVY, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Solicitar {nome.split(" ")[0]} →</button>}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}

        {tab === "solicitar" && (
          formOk ? (
            <div style={{ textAlign: "center", padding: "40px 20px" }}>
              <div style={{ width: 56, height: 56, borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 24 }}>✓</div>
              <p style={{ fontWeight: 700, fontSize: 17, color: NAVY, margin: "0 0 6px" }}>Chamado publicado!</p>
              <p style={{ fontSize: 13, color: SLATE, margin: "0 0 28px" }}>Salvo no banco com sucesso.</p>
              <button onClick={() => { setFormOk(false); setTab("historico"); }} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 12, padding: "11px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Ver histórico</button>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {solicitado && <div style={{ background: TEAL_LIGHT, border: `1px solid ${TEAL}40`, borderRadius: 12, padding: "10px 14px", display: "flex", alignItems: "center", gap: 10 }}><Avatar initials={getIniciais(solicitado.perfis?.nome || "")} size={36} /><div><p style={{ fontWeight: 700, fontSize: 13, color: NAVY, margin: 0 }}>{solicitado.perfis?.nome}</p><p style={{ fontSize: 11, color: TEAL, margin: 0 }}>R$ {solicitado.valor_hora || 0} por cirurgia</p></div><button onClick={() => setSolicitado(null)} style={{ marginLeft: "auto", background: "none", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: 16 }}>×</button></div>}
              <div><label style={labelStyle}>Tipo de cirurgia</label><input value={form.cirurgia} onChange={e => setForm({ ...form, cirurgia: e.target.value })} placeholder="Ex: Artroplastia de Quadril" style={inputStyle} /></div>
              <div><label style={labelStyle}>Especialidade</label><select value={form.especialidade} onChange={e => setForm({ ...form, especialidade: e.target.value })} style={inputStyle}>{esps.slice(1).map(x => <option key={x}>{x}</option>)}</select></div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
                <div><label style={labelStyle}>Data</label><input type="date" value={form.data} onChange={e => setForm({ ...form, data: e.target.value })} style={inputStyle} /></div>
                <div><label style={labelStyle}>Hora</label><input type="time" value={form.hora} onChange={e => setForm({ ...form, hora: e.target.value })} style={inputStyle} /></div>
              </div>
              <div><label style={labelStyle}>Urgência</label><div style={{ display: "flex", gap: 8 }}>{[["eletiva","Eletiva",SLATE],["urgente","Urgente",AMBER],["emergencia","Emergência",CORAL]].map(([k,l,c]) => <button key={k} onClick={() => setForm({ ...form, urgencia: k })} style={{ flex: 1, padding: "7px 4px", borderRadius: 10, fontSize: 10, fontWeight: 700, cursor: "pointer", border: `2px solid ${form.urgencia===k?c:BORDER}`, background: form.urgencia===k?`${c}15`:"#fff", color: form.urgencia===k?c:"#94A3B8" }}>{l}</button>)}</div></div>
              <div><label style={labelStyle}>Observações</label><textarea value={form.obs} onChange={e => setForm({ ...form, obs: e.target.value })} placeholder="Material, acesso ao CC, preferências..." rows={3} style={{ ...inputStyle, resize: "none" }} /></div>
              {solicitado
                ? <button onClick={handleSolicitar} disabled={salvando} style={{ background: TEAL, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: salvando ? 0.7 : 1 }}>{salvando ? "Salvando..." : `Solicitar ${(solicitado.perfis?.nome||"").split(" ")[0]} — R$ ${solicitado.valor_hora||0} →`}</button>
                : <button onClick={handlePublicar} disabled={salvando} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 12, padding: 13, fontSize: 13, fontWeight: 700, cursor: "pointer", opacity: salvando ? 0.7 : 1 }}>{salvando ? "Publicando..." : "Publicar chamado aberto →"}</button>
              }
            </div>
          )
        )}

        {tab === "historico" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {loadingChamados ? <Loading msg="Carregando histórico..." /> : chamados.length === 0 ? <Vazio msg="Nenhum chamado publicado ainda." /> : chamados.map(c => {
              const st = statusCfg[c.status] || statusCfg.aberto;
              return (
                <div key={c.id} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "13px 15px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <div><p style={{ fontWeight: 700, fontSize: 13, color: NAVY, margin: 0 }}>{c.cirurgia}</p><p style={{ fontSize: 11, color: SLATE, margin: "3px 0 0" }}>{c.especialidade} · {new Date(c.data_procedimento).toLocaleDateString("pt-BR")}</p></div>
                    <div style={{ textAlign: "right" }}>{c.valor_ofertado > 0 && <p style={{ fontWeight: 700, fontSize: 13, color: NAVY, margin: "0 0 4px" }}>R$ {c.valor_ofertado.toLocaleString("pt-BR")}</p>}<Badge urgencia={c.urgencia} /></div>
                  </div>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 20, background: st.bg, color: st.color }}>{st.label}</span>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VISÃO INSTRUMENTADOR ─────────────────────────────────────────────────────
function VisaoInstrumentador({ usuario }) {
  const [tab, setTab] = useState("feed");
  const [chamadosAbertos, setChamadosAbertos] = useState([]);
  const [agenda, setAgenda] = useState([]);
  const [loading, setLoading] = useState(true);
  const [disponivel, setDisponivel] = useState(true);
  const [atualizando, setAtualizando] = useState(false);
  const [chatAberto, setChatAberto] = useState(null);
  const [msgs, setMsgs] = useState({});
  const [msgInput, setMsgInput] = useState("");

  const buscarDados = async () => {
    setLoading(true);
    const { data: meuPerfil } = await supabase.from("instrumentadores").select("disponivel").eq("id", usuario.id).single();
    if (meuPerfil) setDisponivel(meuPerfil.disponivel);
    const { data: abertos } = await supabase.from("chamados").select("*, perfis(nome)").eq("status", "aberto").order("criado_em", { ascending: false });
    if (abertos) setChamadosAbertos(abertos);
    const { data: meus } = await supabase.from("chamados").select("*, perfis(nome)").eq("instrumentador_id", usuario.id).in("status", ["aceito","em_andamento","concluido"]).order("data_procedimento", { ascending: true });
    if (meus) setAgenda(meus);
    setLoading(false);
  };

  useEffect(() => { buscarDados(); }, [usuario.id]);

  // Realtime: novo chamado aparece no feed automaticamente
  useEffect(() => {
    const canal = supabase.channel("chamados-feed")
      .on("postgres_changes", { event: "INSERT", schema: "public", table: "chamados" }, payload => {
        if (payload.new.status === "aberto") setChamadosAbertos(prev => [payload.new, ...prev]);
      })
      .on("postgres_changes", { event: "UPDATE", schema: "public", table: "chamados" }, payload => {
        if (payload.new.status !== "aberto") setChamadosAbertos(prev => prev.filter(c => c.id !== payload.new.id));
      }).subscribe();
    return () => supabase.removeChannel(canal);
  }, []);

  const toggleDisponivel = async () => {
    setAtualizando(true);
    const novo = !disponivel;
    await supabase.from("instrumentadores").update({ disponivel: novo }).eq("id", usuario.id);
    setDisponivel(novo);
    setAtualizando(false);
  };

  const aceitarChamado = async (c) => {
    const { error } = await supabase.from("chamados").update({ status: "aceito", instrumentador_id: usuario.id }).eq("id", c.id);
    if (!error) {
      setChamadosAbertos(prev => prev.filter(x => x.id !== c.id));
      setAgenda(prev => [...prev, { ...c, status: "aceito", instrumentador_id: usuario.id }]);
      setTab("agenda");
    }
  };

  const enviarMsg = async () => {
    if (!msgInput.trim() || !chatAberto) return;
    await supabase.from("mensagens").insert({ chamado_id: chatAberto.id, remetente_id: usuario.id, conteudo: msgInput });
    setMsgs(prev => ({ ...prev, [chatAberto.id]: [...(prev[chatAberto.id] || []), { de: "eu", txt: msgInput }] }));
    setMsgInput("");
  };

  if (loading) return <Loading msg="Carregando chamados..." />;

  if (chatAberto) return (
    <div style={{ display: "flex", flexDirection: "column", height: 620 }}>
      <div style={{ background: NAVY, padding: "16px 18px 14px" }}>
        <button onClick={() => setChatAberto(null)} style={{ background: "none", border: "none", color: "rgba(255,255,255,0.5)", fontSize: 12, cursor: "pointer", padding: 0, marginBottom: 10 }}>← Voltar</button>
        <p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: 0 }}>{chatAberto.perfis?.nome || "Solicitante"}</p>
        <p style={{ color: "rgba(255,255,255,0.4)", fontSize: 11, margin: 0 }}>{chatAberto.cirurgia}</p>
      </div>
      <div style={{ flex: 1, background: SURFACE, padding: "14px 16px", display: "flex", flexDirection: "column", gap: 10, overflowY: "auto" }}>
        {(msgs[chatAberto.id] || [{ de: "eles", txt: "Olá! Confirma disponibilidade?" }]).map((m, i) => <div key={i} style={{ display: "flex", justifyContent: m.de === "eu" ? "flex-end" : "flex-start" }}><div style={{ background: m.de === "eu" ? NAVY : "#fff", color: m.de === "eu" ? "#fff" : NAVY, fontSize: 13, padding: "8px 12px", borderRadius: m.de === "eu" ? "14px 14px 2px 14px" : "14px 14px 14px 2px", border: m.de === "eles" ? `1px solid ${BORDER}` : "none", maxWidth: "76%" }}>{m.txt}</div></div>)}
      </div>
      <div style={{ background: "#fff", borderTop: `1px solid ${BORDER}`, padding: "10px 12px 18px", display: "flex", gap: 8 }}>
        <input value={msgInput} onChange={e => setMsgInput(e.target.value)} onKeyDown={e => e.key === "Enter" && enviarMsg()} placeholder="Mensagem..." style={{ flex: 1, padding: "8px 12px", borderRadius: 10, border: `1px solid ${BORDER}`, fontSize: 13, outline: "none" }} />
        <button onClick={enviarMsg} style={{ background: TEAL, border: "none", borderRadius: 10, padding: "8px 14px", cursor: "pointer", color: "#fff" }}>→</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ background: NAVY, padding: "0 18px 0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0 8px" }}>
          <div><p style={{ color: "rgba(255,255,255,0.4)", fontSize: 9, margin: 0, textTransform: "uppercase" }}>Olá,</p><p style={{ color: "#fff", fontWeight: 700, fontSize: 14, margin: "2px 0 0" }}>{usuario.nome.split(" ")[0]}</p></div>
          <button onClick={toggleDisponivel} disabled={atualizando} style={{ display: "flex", alignItems: "center", gap: 7, background: disponivel ? TEAL : "rgba(255,255,255,0.1)", border: "none", borderRadius: 24, padding: "6px 14px", cursor: "pointer" }}>
            <span style={{ width: 7, height: 7, borderRadius: "50%", background: disponivel ? "#fff" : "#64748B", display: "inline-block" }} />
            <span style={{ color: disponivel ? "#fff" : "#64748B", fontSize: 11, fontWeight: 700 }}>{atualizando ? "..." : disponivel ? "Disponível" : "Indisponível"}</span>
          </button>
        </div>
        <NavTabs tabs={[["feed",`Chamados${chamadosAbertos.length > 0 ? ` (${chamadosAbertos.length})` : ""}`],["agenda",`Agenda${agenda.length > 0 ? ` (${agenda.length})` : ""}`],["ganhos","Ganhos"]]} active={tab} onChange={setTab} />
      </div>
      <div style={{ padding: "14px 16px 80px", background: SURFACE, minHeight: 420 }}>
        {tab === "feed" && (
          <div>
            {!disponivel && <div style={{ background: "#FEF3C7", border: "1px solid #FCD34D", borderRadius: 10, padding: "8px 12px", marginBottom: 10, fontSize: 12, color: "#92400E" }}>⚠️ Status inativo. Ative para receber chamados.</div>}
            {chamadosAbertos.length === 0 ? <Vazio msg="Nenhum chamado aberto no momento." /> : (
              <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                {chamadosAbertos.map(c => (
                  <div key={c.id} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 14, padding: "13px 15px" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                      <div><p style={{ fontWeight: 700, fontSize: 14, color: NAVY, margin: 0 }}>{c.cirurgia}</p><p style={{ fontSize: 11, color: SLATE, margin: "2px 0 0" }}>{c.perfis?.nome || "Solicitante"} · {c.tipo_solicitante}</p></div>
                      <Badge urgencia={c.urgencia} />
                    </div>
                    <div style={{ display: "flex", gap: 14, marginBottom: 9 }}>
                      <span style={{ fontSize: 11, color: SLATE }}>📅 {new Date(c.data_procedimento).toLocaleDateString("pt-BR")}</span>
                      <span style={{ fontSize: 11, color: SLATE }}>🏥 {c.especialidade}</span>
                      {c.valor_ofertado > 0 && <span style={{ fontSize: 14, fontWeight: 700, color: TEAL, marginLeft: "auto" }}>R$ {c.valor_ofertado.toLocaleString("pt-BR")}</span>}
                    </div>
                    <div style={{ display: "flex", gap: 8 }}>
                      <button onClick={() => setChatAberto(c)} style={{ padding: "7px 12px", borderRadius: 9, border: `1px solid ${BORDER}`, background: "#fff", color: SLATE, fontSize: 11, cursor: "pointer" }}>💬 Chat</button>
                      <button onClick={() => aceitarChamado(c)} style={{ flex: 2, padding: "7px 0", borderRadius: 9, border: "none", background: TEAL, color: "#fff", fontSize: 11, fontWeight: 700, cursor: "pointer" }}>Aceitar →</button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
        {tab === "agenda" && (
          <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
            {agenda.length === 0 ? <Vazio msg="Nenhum procedimento agendado ainda." /> : agenda.map(c => (
              <div key={c.id} style={{ background: "#fff", borderLeft: `4px solid ${TEAL}`, border: `1px solid ${BORDER}`, borderRadius: 14, padding: "13px 15px" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <p style={{ fontWeight: 700, fontSize: 13, color: NAVY, margin: 0 }}>{c.cirurgia}</p>
                  <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 20, background: "#DBEAFE", color: "#1E40AF" }}>ACEITO</span>
                </div>
                <p style={{ fontSize: 11, color: SLATE, margin: "0 0 8px" }}>{c.perfis?.nome || "Solicitante"} · {c.especialidade}</p>
                <div style={{ display: "flex", gap: 14, alignItems: "center" }}>
                  <span style={{ fontSize: 11, color: SLATE }}>📅 {new Date(c.data_procedimento).toLocaleDateString("pt-BR")}</span>
                  <span style={{ fontSize: 11, color: SLATE }}>⏰ {new Date(c.data_procedimento).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" })}</span>
                  {c.valor_ofertado > 0 && <span style={{ fontSize: 13, fontWeight: 700, color: TEAL, marginLeft: "auto" }}>R$ {c.valor_ofertado.toLocaleString("pt-BR")}</span>}
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "ganhos" && (
          <div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 14 }}>
              {[
                ["Agendados", agenda.filter(c => c.status === "aceito").length.toString()],
                ["Concluídos", agenda.filter(c => c.status === "concluido").length.toString()],
                ["A receber", `R$ ${agenda.filter(c => c.status === "aceito").reduce((s,c) => s + (c.valor_ofertado||0), 0).toLocaleString("pt-BR")}`],
                ["Recebido", `R$ ${agenda.filter(c => c.status === "concluido").reduce((s,c) => s + (c.valor_ofertado||0), 0).toLocaleString("pt-BR")}`]
              ].map(([l,v]) => <div key={l} style={{ background: "#fff", border: `1px solid ${BORDER}`, borderRadius: 12, padding: "11px 13px" }}><p style={{ fontSize: 9, color: "#94A3B8", fontWeight: 700, margin: "0 0 3px", textTransform: "uppercase", letterSpacing: 0.5 }}>{l}</p><p style={{ fontSize: 17, fontWeight: 700, color: NAVY, margin: 0 }}>{v}</p></div>)}
            </div>
            {agenda.length === 0 && <Vazio msg="Nenhum procedimento registrado ainda." />}
          </div>
        )}
      </div>
    </div>
  );
}

// ─── VISÃO INTERMEDIADOR ──────────────────────────────────────────────────────
function VisaoIntermediador({ usuario }) {
  const [tab, setTab] = useState("chamados");
  const [chamados, setChamados] = useState([]);
  const [rede, setRede] = useState([]);
  const [loading, setLoading] = useState(true);
  const [aceito, setAceito] = useState(null);
  const [instrSel, setInstrSel] = useState(null);
  const [repasse, setRepasse] = useState(0);
  const [salvando, setSalvando] = useState(false);
  const [confirmado, setConfirmado] = useState(false);
  const getIniciais = (nome = "") => nome.split(" ").map(n => n[0]).join("").slice(0,2).toUpperCase();

  useEffect(() => {
    const buscar = async () => {
      setLoading(true);
      const { data: abertos } = await supabase.from("chamados").select("*, perfis(nome)").eq("status","aberto").order("criado_em",{ascending:false});
      if (abertos) setChamados(abertos);
      const { data: todos } = await supabase.from("instrumentadores").select("*, perfis(nome)").eq("disponivel",true).limit(10);
      if (todos) setRede(todos);
      setLoading(false);
    };
    buscar();
  }, [usuario.id]);

  const handleConfirmar = async () => {
    setSalvando(true);
    const { error } = await supabase.from("chamados").update({ status:"aceito", instrumentador_id:instrSel.id, intermediador_id:usuario.id }).eq("id",aceito.id);
    if (!error) {
      await supabase.from("transacoes").insert({ chamado_id:aceito.id, pagador_id:aceito.solicitante_id, recebedor_id:usuario.id, valor:aceito.valor_ofertado||0, valor_repasse:repasse, margem:(aceito.valor_ofertado||0)-repasse, status:"pendente" });
      setChamados(prev => prev.filter(c => c.id !== aceito.id));
      setConfirmado(true);
    } else alert("Erro: " + error.message);
    setSalvando(false);
  };

  if (loading) return <Loading msg="Carregando..." />;

  if (confirmado && aceito && instrSel) return (
    <div style={{ padding: "40px 20px", textAlign: "center" }}>
      <div style={{ width: 56, height: 56, borderRadius: "50%", background: TEAL_LIGHT, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 14px", fontSize: 24 }}>✓</div>
      <p style={{ fontWeight: 700, fontSize: 17, color: NAVY, margin: "0 0 6px" }}>Repasse confirmado!</p>
      <p style={{ fontSize: 13, color: SLATE, margin: "0 0 20px" }}>{instrSel.perfis?.nome} foi notificado.</p>
      <div style={{ background: "#F0FDF4", border: "1px solid #BBF7D0", borderRadius: 14, padding: 16, textAlign: "left", marginBottom: 20 }}>
        {[["Você cobrou",`R$ ${(aceito.valor_ofertado||0).toLocaleString("pt-BR")}`],["Repasse",`R$ ${repasse.toLocaleString("pt-BR")}`],["Sua margem",`R$ ${((aceito.valor_ofertado||0)-repasse).toLocaleString("pt-BR")}`]].map(([l,v],i) => <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:i<2?6:0, borderTop:i===2?"1px solid #BBF7D0":"none", paddingTop:i===2?8:0 }}><span style={{ fontSize:12, color:SLATE }}>{l}</span><span style={{ fontWeight:700, color:i===2?TEAL:NAVY, fontSize:i===2?15:13 }}>{v}</span></div>)}
      </div>
      <button onClick={() => { setConfirmado(false); setAceito(null); setInstrSel(null); }} style={{ background: NAVY, color: "#fff", border: "none", borderRadius: 12, padding: "11px 28px", fontSize: 13, fontWeight: 700, cursor: "pointer" }}>Ver próximos chamados</button>
    </div>
  );

  if (aceito) return (
    <div>
      <div style={{ background: NAVY, padding: "16px 18px 18px" }}>
        <button onClick={() => setAceito(null)} style={{ background:"none", border:"none", color:"rgba(255,255,255,0.5)", fontSize:12, cursor:"pointer", padding:0, marginBottom:12 }}>← Voltar</button>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:9, margin:"0 0 2px", textTransform:"uppercase" }}>Chamado recebido</p>
        <p style={{ color:"#fff", fontWeight:700, fontSize:16, margin:"0 0 2px" }}>{aceito.cirurgia}</p>
        <p style={{ color:"rgba(255,255,255,0.4)", fontSize:12, margin:"0 0 6px" }}>{aceito.perfis?.nome} · {new Date(aceito.data_procedimento).toLocaleDateString("pt-BR")}</p>
        {aceito.valor_ofertado > 0 && <p style={{ color:TEAL, fontWeight:700, fontSize:20, margin:0 }}>R$ {aceito.valor_ofertado.toLocaleString("pt-BR")}</p>}
      </div>
      <div style={{ padding:"14px 16px 80px", background:SURFACE }}>
        <p style={{ fontWeight:700, fontSize:13, color:NAVY, margin:"0 0 10px" }}>Selecionar instrumentador</p>
        {rede.length === 0 ? <Vazio msg="Nenhum instrumentador disponível." /> : (
          <div style={{ display:"flex", flexDirection:"column", gap:9, marginBottom:16 }}>
            {rede.map(i => { const nome = i.perfis?.nome||"Instrumentador"; return <div key={i.id} onClick={() => { setInstrSel(i); setRepasse(Math.round((aceito.valor_ofertado||0)*0.75)); }} style={{ background:"#fff", border:`2px solid ${instrSel?.id===i.id?TEAL:BORDER}`, borderRadius:14, padding:"11px 14px", cursor:"pointer", display:"flex", gap:11, alignItems:"center" }}><Avatar initials={getIniciais(nome)} size={38} /><div style={{ flex:1 }}><p style={{ fontWeight:700, fontSize:13, color:NAVY, margin:0 }}>{nome}</p><p style={{ fontSize:11, color:SLATE, margin:"2px 0 0" }}>{(i.especialidades||[]).join(", ")}</p></div><p style={{ fontWeight:700, color:NAVY, fontSize:12, margin:0 }}>R$ {i.valor_hora||0}/cir</p></div>; })}
          </div>
        )}
        {instrSel && aceito.valor_ofertado > 0 && (
          <div style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:14, padding:14, marginBottom:14 }}>
            <label style={{ fontSize:10, fontWeight:700, color:SLATE, display:"block", marginBottom:6, textTransform:"uppercase" }}>Valor do repasse: <span style={{ color:NAVY }}>R$ {repasse.toLocaleString("pt-BR")}</span></label>
            <input type="range" min={100} max={aceito.valor_ofertado-50} step={50} value={repasse} onChange={e => setRepasse(Number(e.target.value))} style={{ width:"100%", marginBottom:12 }} />
            <div style={{ background:"#F0FDF4", borderRadius:10, padding:"10px 12px" }}>
              {[["Você cobra",`R$ ${(aceito.valor_ofertado||0).toLocaleString("pt-BR")}`],[`Repasse p/ ${(instrSel.perfis?.nome||"").split(" ")[0]}`,`R$ ${repasse.toLocaleString("pt-BR")}`]].map(([l,v]) => <div key={l} style={{ display:"flex", justifyContent:"space-between", marginBottom:5 }}><span style={{ fontSize:11, color:SLATE }}>{l}</span><span style={{ fontSize:12, fontWeight:700, color:NAVY }}>{v}</span></div>)}
              <div style={{ borderTop:"1px solid #BBF7D0", paddingTop:7, display:"flex", justifyContent:"space-between" }}><span style={{ fontSize:12, fontWeight:700, color:TEAL }}>Sua margem</span><span style={{ fontSize:15, fontWeight:700, color:TEAL }}>R$ {((aceito.valor_ofertado||0)-repasse).toLocaleString("pt-BR")}</span></div>
            </div>
          </div>
        )}
        <button onClick={handleConfirmar} disabled={!instrSel||salvando} style={{ width:"100%", background:instrSel?TEAL:"#E2E8F0", color:instrSel?"#fff":"#94A3B8", border:"none", borderRadius:12, padding:13, fontSize:13, fontWeight:700, cursor:instrSel?"pointer":"not-allowed" }}>{salvando?"Salvando...":"Confirmar repasse →"}</button>
      </div>
    </div>
  );

  return (
    <div>
      <div style={{ background:NAVY, padding:"0 18px 0" }}>
        <div style={{ padding:"10px 0 8px" }}><p style={{ color:"rgba(255,255,255,0.4)", fontSize:9, margin:0, textTransform:"uppercase" }}>Intermediador</p><p style={{ color:"#fff", fontWeight:700, fontSize:14, margin:"2px 0 0" }}>{usuario.nome.split(" ")[0]}</p></div>
        <NavTabs tabs={[["chamados","Chamados"],["ganhos","Ganhos"]]} active={tab} onChange={setTab} />
      </div>
      <div style={{ padding:"14px 16px 80px", background:SURFACE, minHeight:420 }}>
        {tab === "chamados" && (
          <div style={{ display:"flex", flexDirection:"column", gap:10 }}>
            {chamados.length === 0 ? <Vazio msg="Nenhum chamado aberto." /> : chamados.map(c => (
              <div key={c.id} style={{ background:"#fff", border:`1px solid ${BORDER}`, borderRadius:14, padding:"13px 15px" }}>
                <div style={{ display:"flex", justifyContent:"space-between", marginBottom:6 }}><div><p style={{ fontWeight:700, fontSize:14, color:NAVY, margin:0 }}>{c.cirurgia}</p><p style={{ fontSize:11, color:SLATE, margin:"2px 0 0" }}>{c.perfis?.nome}</p></div><Badge urgencia={c.urgencia} /></div>
                <div style={{ display:"flex", gap:14, marginBottom:9 }}><span style={{ fontSize:11, color:SLATE }}>📅 {new Date(c.data_procedimento).toLocaleDateString("pt-BR")}</span><span style={{ fontSize:11, color:SLATE }}>🏥 {c.especialidade}</span></div>
                <div style={{ display:"flex", justifyContent:"space-between", alignItems:"center" }}>
                  {c.valor_ofertado > 0 ? <span style={{ fontSize:16, fontWeight:700, color:TEAL }}>R$ {c.valor_ofertado.toLocaleString("pt-BR")}</span> : <span style={{ fontSize:12, color:"#94A3B8" }}>Valor a negociar</span>}
                  <button onClick={() => setAceito(c)} style={{ background:NAVY, color:"#fff", border:"none", borderRadius:10, padding:"8px 14px", fontSize:11, fontWeight:700, cursor:"pointer" }}>Aceitar e repassar →</button>
                </div>
              </div>
            ))}
          </div>
        )}
        {tab === "ganhos" && <Vazio msg="Histórico financeiro disponível em breve." />}
      </div>
    </div>
  );
}

// ─── APP PRINCIPAL ─────────────────────────────────────────────────────────────
const NAV = [
  { key: "medico", label: "Médico", icon: "🩺" },
  { key: "hospital", label: "Hospital", icon: "🏥" },
  { key: "opme", label: "OPME", icon: "📦" },
  { key: "instrumentador", label: "Instrumentador", icon: "🔬" },
  { key: "intermediador", label: "Intermediador", icon: "👥" },
];

function AppLogado({ usuario, onLogout }) {
  const [perfil, setPerfil] = useState(usuario.tipo || "medico");
  const isContratante = ["medico","hospital","opme"].includes(perfil);
  return (
    <div style={{ display:"flex", flexDirection:"column", minHeight:720 }}>
      <AppHeader onLogout={onLogout} onBell={() => {}} />
      <div style={{ flex:1, overflowY:"auto", maxHeight:636 }}>
        {isContratante && <VisaoContratante usuario={usuario} perfil={perfil} />}
        {perfil === "instrumentador" && <VisaoInstrumentador usuario={usuario} />}
        {perfil === "intermediador" && <VisaoIntermediador usuario={usuario} />}
      </div>
      <div style={{ background:"#fff", borderTop:`1px solid ${BORDER}`, display:"flex", padding:"7px 2px 9px" }}>
        {NAV.map(p => <button key={p.key} onClick={() => setPerfil(p.key)} style={{ flex:1, background:"none", border:"none", cursor:"pointer", display:"flex", flexDirection:"column", alignItems:"center", gap:3, padding:"3px 0" }}><span style={{ fontSize:18, opacity:perfil===p.key?1:0.25 }}>{p.icon}</span><span style={{ fontSize:8, fontWeight:perfil===p.key?700:400, color:perfil===p.key?NAVY:"#94A3B8" }}>{p.label}</span></button>)}
      </div>
    </div>
  );
}

export default function App() {
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    supabase.auth.getSession().then(async ({ data: { session } }) => {
      if (session?.user) {
        const { data: perfil } = await supabase.from("perfis").select("*").eq("id",session.user.id).single();
        if (perfil) setUsuario({ tipo:perfil.tipo, nome:perfil.nome, id:perfil.id });
      }
      setLoading(false);
    });
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event,session) => {
      if (event === "SIGNED_OUT") setUsuario(null);
    });
    return () => subscription.unsubscribe();
  }, []);
  const handleLogout = async () => { await supabase.auth.signOut(); setUsuario(null); };
  if (loading) return <div style={{ display:"flex", justifyContent:"center", alignItems:"center", minHeight:"100vh", background:"#C8D4DE" }}><div style={{ textAlign:"center" }}><CirrusLogo size={48} /><p style={{ color:SLATE, fontSize:13, marginTop:12 }}>Carregando...</p></div></div>;
  return (
    <div style={{ display:"flex", justifyContent:"center", alignItems:"flex-start", minHeight:"100vh", background:"#C8D4DE", padding:"20px 0", fontFamily:"'DM Sans','Segoe UI',sans-serif" }}>
      <div style={{ width:390, background:SURFACE, borderRadius:32, overflow:"hidden", boxShadow:"0 28px 70px rgba(0,0,0,0.24)", position:"relative", minHeight:720 }}>
        {!usuario ? <Onboarding onConcluir={setUsuario} /> : <AppLogado usuario={usuario} onLogout={handleLogout} />}
      </div>
    </div>
  );
}