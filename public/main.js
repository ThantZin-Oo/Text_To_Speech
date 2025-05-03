let fullText = "";
// let title = document.getElementById('title').value;
async function generateVoice() {
  let title = document.getElementById('title').value;
  let text = fullText.trim() || quill.getText().trim();
  let downloadMp3 = document.getElementById("downloadMp3");
 if(fullText.trim() || quill.getText().trim()) {
  let btn = document.getElementById('btn');
  console.log(btn.textContent);
  btn.disabled = true;
  btn.textContent = "Processing...";
  console.log('this is title' + title);
  const res = await fetch("/speak", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, text, lang: "en"}),
  }).finally(() =>{
    btn.disabled = false;
    btn.textContent = "Upload";
  });
  const blob = await res.blob();
  const url = URL.createObjectURL(blob);
  document.getElementById("player").src = url;
  downloadMp3.href=url;
  downloadMp3.download=title;
  downloadMp3.style.display = "block";
 }
  if(fullText) {
    document.getElementById("pdf_upload").value="";
  }
  else quill.setText("");
  title="";
}

