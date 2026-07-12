import { API_BASE } from "../pages/DesignSystem";
import { Spinner } from "./Ui";

export function Header({ online, deviceInfo, loadingSum, time, S, colors }) {
  return (
    <header style={S.header}>
      <div>
        <h1 style={S.headerTitle}>TABUNGAN DIGITAL</h1>
        <p style={S.headerSub}>Smart Saving Box · IoT Project · ESP32</p>
      </div>
      <div style={{ display: "flex", gap: "10px", flexWrap: "wrap", alignItems: "center" }}>
        <span style={S.badge(online ? "#00C853" : colors.pink)}>
          <span style={{
            width: 8, height: 8, borderRadius: "50%",
            background: colors.black,
            display: "inline-block",
            animation: online ? "pulse 1.2s infinite" : "none",
          }} />
          {online ? "ONLINE" : "OFFLINE"}
        </span>
        <span style={S.badge(colors.cyan)}>
          {deviceInfo?.chip || "ESP32"}
        </span>
        <span style={S.badge(colors.yellow)} title="Auto-refresh setiap 15 detik">
          {loadingSum ? <><Spinner />SYNC...</> : "● LIVE"}
        </span>
        <span style={{ ...S.badge(colors.gray), fontSize: "10px" }}>
          {time.toLocaleTimeString("id-ID")}
        </span>
      </div>
    </header>
  );
}