import { useState } from "react";

const COLORS = {
  bg: "#0F1419",
  card: "#1A2332",
  cardHover: "#1E2A3A",
  accent: "#4EA8DE",
  accentGlow: "rgba(78,168,222,0.15)",
  green: "#34D399",
  greenBg: "rgba(52,211,153,0.1)",
  red: "#F87171",
  redBg: "rgba(248,113,113,0.1)",
  yellow: "#FBBF24",
  yellowBg: "rgba(251,191,36,0.1)",
  orange: "#FB923C",
  purple: "#A78BFA",
  purpleBg: "rgba(167,139,250,0.1)",
  text: "#E2E8F0",
  muted: "#8899AA",
  border: "#2A3A4A",
  white: "#FFFFFF",
};

const KPI = ({ label, value, sub, color }) => (
  <div style={{ textAlign: "center", padding: "8px 12px" }}>
    <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 2, letterSpacing: "0.05em", textTransform: "uppercase" }}>{label}</div>
    <div style={{ fontSize: 22, fontWeight: 700, color: color || COLORS.white, fontFamily: "'JetBrains Mono', monospace" }}>{value}</div>
    {sub && <div style={{ fontSize: 10, color: COLORS.muted, marginTop: 1 }}>{sub}</div>}
  </div>
);

const Arrow = ({ vertical, label, rate, color }) => {
  if (vertical) return (
    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", margin: "4px 0" }}>
      <div style={{ width: 2, height: 20, background: `linear-gradient(to bottom, ${color || COLORS.accent}, transparent)` }} />
      <div style={{ fontSize: 14 }}>↓</div>
      {label && <div style={{ fontSize: 9, color: COLORS.muted, marginTop: -2 }}>{label}</div>}
      {rate && <div style={{ fontSize: 11, fontWeight: 700, color: color || COLORS.accent }}>{rate}</div>}
    </div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", margin: "0 6px" }}>
      <div style={{ width: 24, height: 2, background: color || COLORS.accent }} />
      <div style={{ fontSize: 14, color: color || COLORS.accent }}>→</div>
      {rate && <div style={{ fontSize: 10, fontWeight: 600, color: color || COLORS.accent, marginLeft: 4 }}>{rate}</div>}
    </div>
  );
};

const FunnelStep = ({ title, subtitle, metrics, color, status, width }) => (
  <div style={{
    background: COLORS.card, border: `1px solid ${color || COLORS.border}`,
    borderRadius: 10, padding: "14px 16px", width: width || 200,
    boxShadow: status === "active" ? `0 0 20px ${color}33` : "none",
    position: "relative"
  }}>
    {status && (
      <div style={{
        position: "absolute", top: -8, right: 10, fontSize: 9, fontWeight: 700,
        padding: "2px 8px", borderRadius: 8, letterSpacing: "0.05em",
        background: status === "active" ? COLORS.greenBg : status === "paused" ? COLORS.yellowBg : COLORS.redBg,
        color: status === "active" ? COLORS.green : status === "paused" ? COLORS.yellow : COLORS.red,
        border: `1px solid ${status === "active" ? COLORS.green : status === "paused" ? COLORS.yellow : COLORS.red}44`
      }}>{status === "active" ? "AKTIV" : status === "paused" ? "PAUSE" : "MANGLER"}</div>
    )}
    <div style={{ fontSize: 13, fontWeight: 700, color: color || COLORS.accent, marginBottom: 2 }}>{title}</div>
    {subtitle && <div style={{ fontSize: 10, color: COLORS.muted, marginBottom: 8 }}>{subtitle}</div>}
    {metrics && metrics.map((m, i) => (
      <div key={i} style={{ display: "flex", justifyContent: "space-between", fontSize: 11, padding: "2px 0", borderTop: i > 0 ? `1px solid ${COLORS.border}` : "none" }}>
        <span style={{ color: COLORS.muted }}>{m.label}</span>
        <span style={{ fontWeight: 600, color: m.color || COLORS.text, fontFamily: "'JetBrains Mono', monospace" }}>{m.value}</span>
      </div>
    ))}
  </div>
);

const Section = ({ title, children, color }) => (
  <div style={{ marginBottom: 32 }}>
    <div style={{
      fontSize: 13, fontWeight: 700, letterSpacing: "0.1em", textTransform: "uppercase",
      color: color || COLORS.accent, marginBottom: 12, paddingBottom: 6,
      borderBottom: `2px solid ${color || COLORS.accent}33`,
      display: "flex", alignItems: "center", gap: 8
    }}>
      <div style={{ width: 4, height: 16, borderRadius: 2, background: color || COLORS.accent }} />
      {title}
    </div>
    {children}
  </div>
);

const tabs = [
  { id: "funnel1", label: "Funnel 1: Ro (239 kr.)", color: COLORS.accent },
  { id: "funnel2", label: "Funnel 2: Masterclass (4.999 kr.)", color: COLORS.purple },
  { id: "funnel3", label: "Funnel 3: Ascendering", color: COLORS.orange },
  { id: "contacts", label: "Kontakter (2.981)", color: COLORS.yellow },
  { id: "money", label: "Money Model", color: COLORS.green },
];

const Funnel1 = () => (
  <div>
    <Section title="Funnel 1 — Direkte salg: Ro i nervesystemet → Tripwire til Start" color={COLORS.accent}>
      <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
        <KPI label="Total spend" value="~62.000" sub="DKK (est.)" />
        <KPI label="Purchases" value="509" />
        <KPI label="Cost/køb" value="106 kr" color={COLORS.green} />
        <KPI label="Produkt" value="239 kr" />
        <KPI label="ROAS (produkt)" value="2,3x" color={COLORS.yellow} />
        <KPI label="Ascend → Start" value="17,1%" color={COLORS.orange} />
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
        <FunnelStep title="META Ads" subtitle="Billede + video annoncer" status="paused"
          metrics={[
            { label: "CPC", value: "3,9 kr" },
            { label: "Gns. spend/md", value: "~7.000 kr" },
          ]} color={COLORS.accent} />
        <Arrow label="" rate="" />
        <FunnelStep title="Salgsside" subtitle="Direkte køb — Ro i nervesystemet" status="active"
          metrics={[
            { label: "Pris", value: "239 kr" },
            { label: "Konv.rate", value: "~5%" },
            { label: "Salg total", value: "509", color: COLORS.green },
          ]} color={COLORS.accent} />
        <Arrow label="" rate="17%" color={COLORS.orange} />
        <FunnelStep title="Tripwire → Smertefri Start" subtitle="Email efter 7 dage" status="active"
          metrics={[
            { label: "Pris", value: "549–1.099 kr" },
            { label: "Konv. fra Ro", value: "17,1%", color: COLORS.orange },
            { label: "Salg total", value: "84" },
          ]} color={COLORS.orange} />
        <Arrow label="" rate="0,6%" color={COLORS.red} />
        <FunnelStep title="→ Smertefri Rejse?" subtitle="Ingen systematisk bro" status="missing"
          metrics={[
            { label: "Konv. fra Ro", value: "0,6%", color: COLORS.red },
            { label: "Kun", value: "3 salg", color: COLORS.red },
            { label: "STATUS", value: "INGEN SEKVENS", color: COLORS.red },
          ]} color={COLORS.red} width={180} />
      </div>
      <div style={{ marginTop: 16, padding: 12, background: COLORS.yellowBg, borderRadius: 8, border: `1px solid ${COLORS.yellow}33`, fontSize: 12, color: COLORS.yellow }}>
        ⚠️ <strong>Problem:</strong> 405 af 491 Ro-købere (80%) har aldrig ascenderet. Ingen email-sekvens efter tripwire-vinduet. Ingen Value Bombs. Ingen retargeting mod højere produkter.
      </div>
    </Section>
  </div>
);

const Funnel2 = () => (
  <div>
    <Section title="Funnel 2 — Masterclass → Smertefri Metoden (4.999 kr.)" color={COLORS.purple}>
      <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
        <KPI label="Masterclass signups" value="2.334" sub="total i GHL" />
        <KPI label="Aldrig købt" value="2.150" sub="92% af signups" color={COLORS.red} />
        <KPI label="Har købt noget" value="184" sub="7,9% konv.rate" color={COLORS.green} />
        <KPI label="Leadpris (karrusel)" value="7-9 kr" color={COLORS.green} />
        <KPI label="Produkt" value="4.999 kr" />
        <KPI label="Rejse-salg total" value="13" />
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <FunnelStep title="META Ads" subtitle="Karruseller + billeder" status="active"
            metrics={[
              { label: "Budget", value: "4.000 kr/md" },
              { label: "Best: Karrusel #1", value: "7,70 kr/lead", color: COLORS.green },
              { label: "Best: Karrusel #2", value: "8,81 kr/lead", color: COLORS.green },
            ]} color={COLORS.purple} />
          <Arrow rate="~500/md" />
          <FunnelStep title="Opt-in side" subtitle="masterclass-smertefrirejse-optin"
            metrics={[
              { label: "Felt", value: "Navn + email" },
              { label: "Adgang", value: "Instant" },
            ]} color={COLORS.purple} />
          <Arrow rate="" />
          <FunnelStep title="Evergreen Masterclass" subtitle="~75 min video"
            metrics={[
              { label: "Format", value: "Video" },
              { label: "Pitch", value: "Sidst i video" },
              { label: "Completion?", value: "Ukendt", color: COLORS.yellow },
            ]} color={COLORS.purple} />
        </div>

        <Arrow vertical rate="0,87%" color={COLORS.purple} label="konverterer" />

        <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", justifyContent: "center" }}>
          <FunnelStep title="Salgsside" subtitle="smertefri_rejse_signup" status="active"
            metrics={[
              { label: "Pris", value: "4.999 kr" },
              { label: "Rateplan", value: "3 × 1.699 kr" },
              { label: "Garanti", value: "14 dage" },
            ]} color={COLORS.purple} />
          <Arrow rate="" />
          <FunnelStep title="Checkout" subtitle="checkout_smertefrirejse"
            metrics={[
              { label: "Order bump?", value: "NEJ ❌", color: COLORS.red },
            ]} color={COLORS.purple} width={150} />
          <Arrow rate="" />
          <FunnelStep title="Kvittering" subtitle="kvittering_smertefri_rejse"
            metrics={[
              { label: "Upsell?", value: "NEJ ❌", color: COLORS.red },
            ]} color={COLORS.purple} width={150} />
        </div>

        <Arrow vertical label="ikke-købere" rate="" color={COLORS.orange} />

        <FunnelStep title="Email-opfølgning" subtitle="5 mails over 5 dage → derefter INGENTING" status="active"
          metrics={[
            { label: "Mails", value: "5 stk / 5 dage" },
            { label: "Indhold", value: "Link til salgsside" },
            { label: "Downsell?", value: "NEJ ❌", color: COLORS.red },
            { label: "Value Bombs?", value: "NEJ ❌", color: COLORS.red },
            { label: "Efter dag 5?", value: "INGENTING ❌", color: COLORS.red },
          ]} color={COLORS.orange} width={280} />
      </div>

      <div style={{ marginTop: 16, padding: 12, background: COLORS.greenBg, borderRadius: 8, border: `1px solid ${COLORS.green}33`, fontSize: 12, color: COLORS.green }}>
        ✅ <strong>Ny kampagne igangsat.</strong> 2 validerede karruseller (141 + 155 opt-ins historisk). Forventet: 3-5 salg/md à 4.999 kr. = 15-25.000 kr./md med 4.000 kr. adspend.
      </div>
      <div style={{ marginTop: 8, padding: 12, background: COLORS.yellowBg, borderRadius: 8, border: `1px solid ${COLORS.yellow}33`, fontSize: 12, color: COLORS.yellow }}>
        ⚠️ <strong>Optimeringsmuligheder:</strong> Split webinar i 4-5 kortere videoer · Tilføj order bump · Byg email-sekvens efter dag 5 med Value Bombs + downsell til Smertefri Start · Tilføj retargeting-kampagne
      </div>
    </Section>
  </div>
);

const Funnel3 = () => (
  <div>
    <Section title="Funnel 3 — Ascendering af eksisterende købere" color={COLORS.orange}>
      <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
        <KPI label="Total kontakter" value="2.981" />
        <KPI label="Aldrig købt" value="2.477" sub="83% af alle" color={COLORS.red} />
        <KPI label="Betalende kunder" value="504" />
        <KPI label="Aldrig ascenderet" value="80%" sub="af købere" color={COLORS.red} />
        <KPI label="Tabt potentiale" value="335.000+" sub="DKK (estimat)" color={COLORS.red} />
      </div>

      <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flexWrap: "wrap", justifyContent: "center" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4 }}>
          <FunnelStep title="491 Ro-købere" subtitle="239 kr. — sidder fast" color={COLORS.red}
            metrics={[
              { label: "Kun købt Ro", value: "405 (80%)", color: COLORS.red },
              { label: "Ascend → Start", value: "84 (17%)", color: COLORS.orange },
              { label: "Ascend → Rejse", value: "3 (0,6%)", color: COLORS.red },
            ]} width={220} />
          <Arrow vertical label="MANGLER" rate="Email-sekvens" color={COLORS.red} />
          <FunnelStep title="Value Bomb-sekvens" subtitle="5-7 emails over 2-3 uger" status="missing" color={COLORS.red}
            metrics={[
              { label: "Nurture", value: "Give værdi" },
              { label: "Proof", value: "Vis resultater" },
              { label: "Offer", value: "Pitch Start/Rejse" },
            ]} width={220} />
          <Arrow vertical rate="mål: 30%" color={COLORS.orange} />
          <FunnelStep title="Smertefri Start (1.299 kr.)" subtitle="Mål: 147 ekstra salg" color={COLORS.orange}
            metrics={[
              { label: "Potentiel ekstra", value: "+80.703 kr", color: COLORS.green },
            ]} width={220} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 0 }}>
          <FunnelStep title="89 Start-købere" subtitle="549–1.099 kr." color={COLORS.orange}
            metrics={[
              { label: "Ascend → Rejse", value: "2 (2,2%)", color: COLORS.red },
            ]} width={220} />
          <Arrow vertical label="MANGLER" rate="Awareness Bridge" color={COLORS.red} />
          <FunnelStep title="Awareness Bridge" subtitle="Video-serie: 15-60 min" status="missing" color={COLORS.red}
            metrics={[
              { label: "Destroy", value: "Gammel overbevisning" },
              { label: "Rebuild", value: "Ny model" },
              { label: "CTA", value: "→ Smertefri Rejse" },
            ]} width={220} />
          <Arrow vertical rate="mål: 5%" color={COLORS.orange} />
          <FunnelStep title="Smertefri Rejse (4.999 kr.)" subtitle="Mål: 24 ekstra salg" color={COLORS.purple}
            metrics={[
              { label: "Potentiel ekstra", value: "+119.976 kr", color: COLORS.green },
            ]} width={220} />
        </div>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 4, marginTop: 0 }}>
          <FunnelStep title="Alle købere" subtitle="504 kunder i universet" color={COLORS.green}
            metrics={[
              { label: "High-ticket?", value: "EKSISTERER IKKE", color: COLORS.red },
            ]} width={220} />
          <Arrow vertical label="MANGLER" rate="Tilbud + funnel" color={COLORS.red} />
          <FunnelStep title="High-ticket backend" subtitle="1-til-1 / VIP-gruppe" status="missing" color={COLORS.red}
            metrics={[
              { label: "Foreslået pris", value: "15.000 kr" },
              { label: "Mål: 2% af Ro", value: "~10 salg" },
              { label: "Potentiel ekstra", value: "+135.000 kr", color: COLORS.green },
            ]} width={220} />
        </div>
      </div>

      <div style={{ marginTop: 20, padding: 14, background: COLORS.redBg, borderRadius: 8, border: `1px solid ${COLORS.red}33`, fontSize: 12, color: COLORS.red }}>
        🔴 <strong>Kritisk:</strong> Ascendering er den STØRSTE løftestang. Med nøjagtig samme annoncebudget og antal kunder — men fungerende email-sekvenser — estimeres +335.000 kr. ekstra omsætning. ROAS fra 2,5x → 6,5x.
      </div>
    </Section>
  </div>
);

const Contacts = () => (
  <div>
    <Section title="Kontakter — Fuld pipeline-analyse (2.981 kontakter fra GHL)" color={COLORS.yellow}>
      <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
        <KPI label="Total kontakter" value="2.981" />
        <KPI label="Aldrig købt" value="2.477" sub="83,1%" color={COLORS.red} />
        <KPI label="Købere" value="504" sub="16,9%" color={COLORS.green} />
        <KPI label="Masterclass leads" value="2.334" />
        <KPI label="MC konv.rate" value="7,9%" sub="184 købte" color={COLORS.yellow} />
      </div>

      {/* Funnel visualization */}
      <div style={{ display: "flex", flexDirection: "column", gap: 4, alignItems: "center", marginBottom: 24 }}>
        {[
          { label: "Total kontakter i GHL", value: 2981, width: 100, color: COLORS.muted },
          { label: "Masterclass leads (tilmeldt, aldrig købt)", value: 2150, width: 85, color: COLORS.yellow },
          { label: "Freebie + QnA leads (aldrig købt)", value: 345, width: 40, color: COLORS.orange },
          { label: "Købt kun Ro i nervesystemet", value: 418, width: 35, color: COLORS.accent },
          { label: "Købt Smertefri Start (± Ro)", value: 74, width: 18, color: COLORS.orange },
          { label: "Købt Smertefri Rejse", value: 12, width: 10, color: COLORS.purple },
        ].map((step, i) => (
          <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, width: "100%" }}>
            <div style={{
              width: `${step.width}%`, minWidth: 120, background: `${step.color}22`,
              border: `1px solid ${step.color}44`, borderRadius: 8, padding: "10px 16px",
              display: "flex", justifyContent: "space-between", alignItems: "center",
              marginLeft: `${(100 - step.width) / 2}%`
            }}>
              <span style={{ fontSize: 12, color: COLORS.text }}>{step.label}</span>
              <span style={{ fontSize: 16, fontWeight: 700, color: step.color, fontFamily: "'JetBrains Mono', monospace" }}>{step.value.toLocaleString('da-DK')}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Segment detail */}
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
        <div style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.yellow}33` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.yellow, marginBottom: 10 }}>2.150 Masterclass leads (aldrig købt)</div>
          <div style={{ fontSize: 11, color: COLORS.muted, marginBottom: 8 }}>Signup per måned:</div>
          {[
            { m: "Maj 25", n: 149 }, { m: "Jun 25", n: 213 }, { m: "Jul 25", n: 44 },
            { m: "Aug 25", n: 30 }, { m: "Sep 25", n: 202 }, { m: "Okt 25", n: 72 },
            { m: "Nov 25", n: 9 }, { m: "Dec 25", n: 483 }, { m: "Jan 26", n: 777 },
            { m: "Feb 26", n: 157 },
          ].map((d, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 3 }}>
              <span style={{ fontSize: 10, color: COLORS.muted, width: 48 }}>{d.m}</span>
              <div style={{ height: 10, borderRadius: 4, background: `${COLORS.yellow}44`, width: `${(d.n / 777) * 100}%`, minWidth: 2 }} />
              <span style={{ fontSize: 10, fontWeight: 600, color: COLORS.yellow, fontFamily: "'JetBrains Mono', monospace" }}>{d.n}</span>
            </div>
          ))}
          <div style={{ marginTop: 10, fontSize: 11, color: COLORS.text }}>
            <strong style={{ color: COLORS.green }}>1.260 leads</strong> fra dec 25 + jan 26 — relativt friske og modtagelige for opfølgning.
          </div>
        </div>

        <div style={{ background: COLORS.card, borderRadius: 10, padding: 16, border: `1px solid ${COLORS.border}` }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: COLORS.text, marginBottom: 10 }}>Øvrige segmenter</div>
          {[
            { label: "QnA-kampagne leads (aldrig købt)", n: 193, color: COLORS.orange },
            { label: "Freebie leads (aldrig købt)", n: 152, color: COLORS.orange },
            { label: "QnA leads der HAR købt", n: 270, color: COLORS.green },
            { label: "Nyhedsbrev (total)", n: 2909, color: COLORS.muted },
          ].map((s, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: `1px solid ${COLORS.border}`, fontSize: 12 }}>
              <span style={{ color: COLORS.muted }}>{s.label}</span>
              <span style={{ fontWeight: 600, color: s.color, fontFamily: "'JetBrains Mono', monospace" }}>{s.n}</span>
            </div>
          ))}
          <div style={{ marginTop: 12, fontSize: 11, color: COLORS.muted }}>
            Tags i GHL: tilføj_nyhedsbrev (2.909) · masterclass smertefrirejse (2.334) · qna-kampagne (937) · købt ro (487) · freebie (372) · købt_smertefri_start (49) · købt_smertefri_rejse (10)
          </div>
        </div>
      </div>

      {/* Key insight */}
      <div style={{ padding: 14, background: COLORS.redBg, borderRadius: 8, border: `1px solid ${COLORS.red}33`, fontSize: 12, color: COLORS.red, marginBottom: 12 }}>
        🔴 <strong>2.477 mennesker har rakt hånden op og sagt "jeg har kroniske smerter" — men aldrig købt.</strong> Det er ikke et trafik-problem. Det er et konverterings-problem. En email-sekvens med Value Bombs til de 2.150 masterclass-leads kunne realistisk konvertere 2-5% ekstra = 40-100 nye kunder uden én ekstra annoncekrone.
      </div>

      <div style={{ padding: 14, background: COLORS.greenBg, borderRadius: 8, border: `1px solid ${COLORS.green}33`, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>📋 Prioriterede email-sekvenser</div>
        <div style={{ color: COLORS.text, lineHeight: 1.8 }}>
          <strong style={{ color: COLORS.yellow }}>1. Masterclass-leads (2.150):</strong> Value Bomb-sekvens → pitch Ro i nervesystemet (239 kr.) som entry → tripwire til Start<br/>
          <strong style={{ color: COLORS.accent }}>2. Ro-købere (418):</strong> Nurture + Awareness Bridge → pitch Smertefri Start (1.299 kr.) → pitch Rejse (4.999 kr.)<br/>
          <strong style={{ color: COLORS.orange }}>3. Start-købere (74):</strong> Case studies + social proof → pitch Smertefri Rejse (4.999 kr.)<br/>
          <strong style={{ color: COLORS.purple }}>4. Genaktivering:</strong> Kolde leads (signup > 90 dage, ingen aktivitet) → "Er du stadig der?"-kampagne
        </div>
      </div>
    </Section>
  </div>
);

const MoneyModel = () => (
  <div>
    <Section title="Samlet Money Model — Værditrappe" color={COLORS.green}>
      <div style={{ display: "flex", gap: 24, marginBottom: 20, flexWrap: "wrap" }}>
        <KPI label="Total kontakter" value="2.981" sub="i GHL" />
        <KPI label="Total omsætning" value="210.402" sub="DKK (maj 25 – feb 26)" />
        <KPI label="Total ads spend" value="85.474" sub="DKK" />
        <KPI label="Profit" value="124.928" sub="DKK" color={COLORS.green} />
        <KPI label="ROAS" value="2,5x" color={COLORS.yellow} />
        <KPI label="Aldrig købt" value="83%" sub="2.477 leads" color={COLORS.red} />
      </div>

      <div style={{ display: "flex", alignItems: "stretch", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
        {[
          { title: "Gratis", items: ["Øvelse (email)", "Masterclass (email)"], color: COLORS.muted, type: "LEAD MAGNET", revenue: "0 kr", n: "2.477 leads (aldrig købt)", status: "✅" },
          { title: "239 kr", items: ["Ro i nervesystemet"], color: COLORS.accent, type: "ATTRACTION", revenue: "108.188 kr", n: "509 salg", status: "✅" },
          { title: "549–1.299 kr", items: ["Smertefri Start"], color: COLORS.orange, type: "MID-TICKET", revenue: "56.855 kr", n: "95 salg", status: "✅" },
          { title: "4.999 kr", items: ["Smertefri Metoden/Rejse"], color: COLORS.purple, type: "SIGNATURKURSUS", revenue: "55.086 kr", n: "13 salg", status: "✅" },
          { title: "299 kr/md", items: ["Livesparring"], color: COLORS.green, type: "CONTINUITY", revenue: "897 kr", n: "3 salg", status: "⚠️" },
          { title: "8–15.000 kr", items: ["1-til-1 / VIP"], color: COLORS.red, type: "HIGH-TICKET", revenue: "0 kr", n: "Eksisterer ikke", status: "❌" },
        ].map((p, i) => (
          <div key={i} style={{
            background: COLORS.card, border: `1px solid ${p.color}44`, borderRadius: 10,
            padding: "14px 16px", width: 155, display: "flex", flexDirection: "column", justifyContent: "space-between"
          }}>
            <div>
              <div style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.08em", color: p.color, marginBottom: 4 }}>{p.type}</div>
              <div style={{ fontSize: 18, fontWeight: 800, color: COLORS.white, marginBottom: 4 }}>{p.title}</div>
              {p.items.map((item, j) => <div key={j} style={{ fontSize: 11, color: COLORS.muted }}>{item}</div>)}
            </div>
            <div style={{ marginTop: 10, paddingTop: 8, borderTop: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: p.color, fontFamily: "'JetBrains Mono', monospace" }}>{p.revenue}</div>
              <div style={{ fontSize: 10, color: COLORS.muted }}>{p.n}</div>
              <div style={{ fontSize: 14, marginTop: 4 }}>{p.status}</div>
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: 20, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
        <div style={{ padding: 14, background: COLORS.redBg, borderRadius: 8, border: `1px solid ${COLORS.red}33`, fontSize: 12 }}>
          <div style={{ fontWeight: 700, color: COLORS.red, marginBottom: 6 }}>❌ Mangler i Money Model</div>
          <div style={{ color: COLORS.text, lineHeight: 1.6 }}>
            • Order bumps på checkout (forventet +30-50% take rate)<br/>
            • Upsell-sekvens efter køb (one-click)<br/>
            • Downsell til dem der afviser (betalingsplan, mini-version)<br/>
            • Struktureret continuity/membership (kun 3 salg)<br/>
            • High-ticket backend (1-til-1 til 10-15.000 kr.)<br/>
            • Email Value Bombs + Awareness Bridge
          </div>
        </div>
        <div style={{ padding: 14, background: COLORS.greenBg, borderRadius: 8, border: `1px solid ${COLORS.green}33`, fontSize: 12 }}>
          <div style={{ fontWeight: 700, color: COLORS.green, marginBottom: 6 }}>✅ Styrker</div>
          <div style={{ color: COLORS.text, lineHeight: 1.6 }}>
            • Profitabel fra måned 2 (kun maj gik i minus)<br/>
            • Leadpriser ekstremt lave (7-10 kr.)<br/>
            • Stærk origin story + autentisk ekspert<br/>
            • 2.981 kontakter i GHL (2.477 ukonverterede leads)<br/>
            • 504 betalende kunder i universet<br/>
            • Produkt der virker (testimonials, resultater)<br/>
            • Stigende AOV over tid (149 → 954 kr.)<br/>
            • Masterclass konv.rate 7,9% (184 af 2.334)
          </div>
        </div>
      </div>

      <div style={{ marginTop: 16, padding: 14, background: COLORS.purpleBg, borderRadius: 8, border: `1px solid ${COLORS.purple}33`, fontSize: 12 }}>
        <div style={{ fontWeight: 700, color: COLORS.purple, marginBottom: 6 }}>📋 Prioriteret handlingsplan</div>
        <div style={{ color: COLORS.text, lineHeight: 1.8 }}>
          <strong style={{ color: COLORS.green }}>NU:</strong> Masterclass-kampagne kører (2 karruseller, 130 kr/dag) · Afklar markedsføringslov (video-annoncer)<br/>
          <strong style={{ color: COLORS.yellow }}>UGE 1-2:</strong> Email Value Bomb-sekvens til 2.150 masterclass-leads · Email-sekvens til 418 Ro-købere · Overvej webinar-split i kortere videoer<br/>
          <strong style={{ color: COLORS.orange }}>EFTER REJSE:</strong> Avatar-arbejde · Grand Slam Offer-redesign (5.000/8.000/15.000 kr.) · Order bumps + upsells · Continuity-struktur<br/>
          <strong style={{ color: COLORS.purple }}>SKALERING:</strong> Core 4 annoncer til alle faser · Retargeting · Horisontal skalering · Genaktivering af kolde leads
        </div>
      </div>
    </Section>
  </div>
);

export default function FunnelDashboard() {
  const [active, setActive] = useState("money");

  return (
    <div style={{
      background: COLORS.bg, color: COLORS.text, minHeight: "100vh",
      fontFamily: "'Inter', -apple-system, sans-serif", padding: "24px 20px"
    }}>
      <link href="https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;700&display=swap" rel="stylesheet" />

      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: 22, fontWeight: 800, color: COLORS.white, margin: 0, letterSpacing: "-0.02em" }}>
          KroniskSmertefriFysioterapi
        </h1>
        <div style={{ fontSize: 12, color: COLORS.muted, marginTop: 4 }}>Funnel & Money Model Overblik — Arbejdsdokument</div>
      </div>

      <div style={{ display: "flex", gap: 4, marginBottom: 24, flexWrap: "wrap" }}>
        {tabs.map(t => (
          <button key={t.id} onClick={() => setActive(t.id)} style={{
            padding: "8px 16px", borderRadius: 8, border: "none", cursor: "pointer",
            fontSize: 12, fontWeight: 600, letterSpacing: "0.02em", transition: "all 0.2s",
            background: active === t.id ? `${t.color}22` : "transparent",
            color: active === t.id ? t.color : COLORS.muted,
            borderBottom: active === t.id ? `2px solid ${t.color}` : "2px solid transparent",
          }}>{t.label}</button>
        ))}
      </div>

      {active === "funnel1" && <Funnel1 />}
      {active === "funnel2" && <Funnel2 />}
      {active === "funnel3" && <Funnel3 />}
      {active === "contacts" && <Contacts />}
      {active === "money" && <MoneyModel />}
    </div>
  );
}
