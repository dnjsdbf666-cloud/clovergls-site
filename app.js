const header = document.querySelector("[data-header]");
const trackingForm = document.querySelector("[data-tracking-form]");
const trackingResult = document.querySelector("[data-tracking-result]");
const quoteForm = document.querySelector("[data-quote-form]");
const quoteResult = document.querySelector("[data-quote-result]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

function valueFrom(formData, key) {
  return String(formData.get(key) || "").trim();
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
    event.preventDefault();
    quoteResult.textContent = "회사명과 담당자명을 입력해 주세요.";
    return;
  }
  if (!inquiry.phone && !inquiry.email) {
    event.preventDefault();
    quoteResult.textContent = "연락처 또는 이메일 중 하나는 입력해 주세요.";
    return;
  }

  quoteResult.classList.add("success");
  quoteResult.textContent = "문의 내용을 전송 중입니다.";
});
