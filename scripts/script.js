const allBtn = document.getElementById("allBtn");
const openBtn = document.getElementById("openBtn");
const closedBtn = document.getElementById("closedBtn");
const allCardContainer = document.getElementById("allCardContainer");
const issueCount = document.getElementById("issueCount");
let allCard = [];
let openCard = [];
let closedCard = [];

function toggleStyle(btn) {
  const btns = document.querySelectorAll(".btn");
  btns.forEach((btn) => {
    btn.classList.remove("bg-[#4A00FF]", "text-white", "font-semibold");
    btn.classList.add(
      "bg-white",
      "text-[#64748B]",
      "border-[#E4E4E7]",
      "font-medium",
    );
  });
  const selectBtn = document.getElementById(btn);

  selectBtn.classList.remove("bg-white", "text-[#64748B]", "border-[#E4E4E7]");
  selectBtn.classList.add("bg-[#4A00FF]", "text-white", "font-semibold");
  loadCards(selectBtn);
}

async function loadCards(Btn) {
  const res = await fetch(
    "https://phi-lab-server.vercel.app/api/v1/lab/issues",
  );
  const data = await res.json();
  displayCards(data.data, Btn);
}

function displayCards(cards, Btn) {
  allCardContainer.innerHTML = "";
  allCard = [];
  openCard = [];
  closedCard = [];
  cards.forEach((card) => {
    const div = document.createElement("div");
    div.innerHTML = `
        <div class = "shadow-sm mb-4 bg-white rounded-lg border-t-4 ${card.status === "open" ? `border-t-[#00A96E]` : `border-t-[#A855F7]`} ">
            <div class="p-6 space-y-3">
            <div class="flex justify-between">  <img src="${card.status === "open" ? `./assets/Open-Status.png` : `./assets/Closed-Status.png`}" alt="" />
            
            <div
            class="badge bg-[#FEECEC] text-[#EF4444] px-[26px] py-[6px] font-medium rounded-full"
            >
          ${card.priority}
          </div>
          </div>
          <div>
          <h3 class="font-semibold text-[14px] mb-2">
          ${card.title}
          </h3>
          <p class="text-[12px] text-[#64748B] line-clamp-2">
          ${card.description}
          </p>
          </div>
          <div class="flex gap-1">
          <div
          class="badge bg-[#FEECEC] text-[#EF4444] border-[#FECACA] text-[12px] font-medium rounded-full"
          >
          <i class="fa-solid fa-bug"></i>${card.labels[0]}
          </div>
          <div
          class="badge bg-[#FFF8DB] text-[#D97706] border-[#FDE68A] text-[12px] font-medium rounded-full"
          >
          <i class="fa-solid fa-life-ring"></i>${card.labels[1]}
          </div>
          </div>
          </div>
          <hr class="border-gray-300" />
          <div class="p-6 space-y-2">
          <p class="text-[12px] text-[#64748B]">${card.author}</p>
          <p class="text-[12px] text-[#64748B]">${card.createdAt}</p>
          </div>
          </div>
          `;

    if (Btn === openBtn) {
      if (card.status === "open") {
        allCardContainer.appendChild(div);
        openCard.push(card);
        issueCount.innerText = `${openCard.length}`;
      }
    } else if (Btn == closedBtn){
      if (card.status == "closed") {
        allCardContainer.appendChild(div);
        closedCard.push(card);
        issueCount.innerText = `${closedCard.length}`;
      }
    }else {
      allCardContainer.appendChild(div);
      allCard.push(card);
      issueCount.innerText = `${allCard.length}`;
    }
  });
}

loadCards(allBtn);