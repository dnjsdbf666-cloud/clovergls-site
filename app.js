const CONTACT_EMAIL = "wy.song@ssanta-express.com";
const CONTACT_PHONE = "01083882122";

const header = document.querySelector("[data-header]");
const trackingForm = document.querySelector("[data-tracking-form]");
const trackingResult = document.querySelector("[data-tracking-result]");
const quoteForm = document.querySelector("[data-quote-form]");
const quoteResult = document.querySelector("[data-quote-result]");
const quoteActions = document.querySelector("[data-quote-actions]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function valueFrom(formData, key) {
  return String(formData.get(key) || "").trim();
}

function buildInquirySummary(data) {
  return [
    "[CLOVER GLS 문의 요약]",
    `회사명: ${data.company}`,
    `담당자: ${data.name}`,
    `연락처: ${data.phone || "-"}`,
    `이메일: ${data.email || "-"}`,
    "",
    "문의 내용:",
    data.message || "-"
  ].join("\n");
}

function buildInquiryMailto(data) {
  const subject = `[CLOVER GLS 문의] ${data.company} / ${data.name}`;
  const body = buildInquirySummary(data);
  return `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}

function buildInquirySms(data) {
  const body = buildInquirySummary(data);
  return `sms:${CONTACT_PHONE}?body=${encodeURIComponent(body)}`;
}

function renderContactActions(data) {
  if (!quoteActions) return;

  quoteActions.hidden = false;
  quoteActions.textContent = "";

  const mailLink = document.createElement("a");
  mailLink.href = buildInquiryMailto(data);
  mailLink.textContent = "메일로 보내기";

  const smsLink = document.createElement("a");
  smsLink.href = buildInquirySms(data);
  smsLink.textContent = "문자로 보내기";

  quoteActions.append(mailLink, smsLink);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

trackingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(trackingForm);
  const trackingNo = valueFrom(formData, "trackingNo");

  trackingResult.className = "tracking-result";
  if (!trackingNo) {
    trackingResult.classList.add("warning");
    trackingResult.textContent = "운송장 번호를 입력해 주세요.";
    return;
  }

  trackingResult.classList.add("success");
  trackingResult.textContent = `${trackingNo} 조회 기능은 서버 연결 후 실제 배송 데이터와 연동됩니다.`;
});

quoteForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(quoteForm);
  const inquiry = {
    company: valueFrom(formData, "company"),
    name: valueFrom(formData, "name"),
    phone: valueFrom(formData, "phone"),
    email: valueFrom(formData, "email"),
    message: valueFrom(formData, "message")
  };

  quoteResult.className = "form-note";
  if (!inquiry.company || !inquiry.name) {
    quoteResult.textContent = "회사명과 담당자명을 입력해 주세요.";
    return;
  }
  if (!inquiry.phone && !inquiry.email) {
    quoteResult.textContent = "연락처 또는 이메일 중 하나는 입력해 주세요.";
    return;
  }

  renderContactActions(inquiry);
  quoteResult.classList.add("success");
  quoteResult.textContent = "요약된 문의 내용이 준비되었습니다. 메일 작성창이 열리면 내용을 확인한 뒤 보내기를 눌러 주세요.";
  window.location.href = buildInquiryMailto(inquiry);
});
