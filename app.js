const header = document.querySelector("[data-header]");
const trackingForm = document.querySelector("[data-tracking-form]");
const trackingResult = document.querySelector("[data-tracking-result]");
const quoteForm = document.querySelector("[data-quote-form]");
const quoteResult = document.querySelector("[data-quote-result]");

function syncHeader() {
  if (!header) return;
  header.classList.toggle("is-scrolled", window.scrollY > 24);
}

window.addEventListener("scroll", syncHeader, { passive: true });
syncHeader();

trackingForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const formData = new FormData(trackingForm);
  const trackingNo = String(formData.get("trackingNo") || "").trim();

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
  const company = String(formData.get("company") || "").trim();
  const name = String(formData.get("name") || "").trim();

  quoteResult.className = "form-note";
  if (!company || !name) {
    quoteResult.textContent = "회사명과 담당자명을 입력해 주세요.";
    return;
  }

  quoteResult.classList.add("success");
  quoteResult.textContent = "문의 접수 화면 예시입니다. 서버 연결 후 관리자에게 전달되도록 만들 수 있습니다.";
  quoteForm.reset();
});
