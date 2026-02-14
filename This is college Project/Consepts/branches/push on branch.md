Perfect 👍
Main **bilkul beginner-safe, step-by-step** bata raha hoon.
Tum bas commands follow karo — confusion zero.

Sentence correction 👇
**“mujhe branch pe commit ke bad push karana hai” ❌**
👉 **“Mujhe feature branch par commit ke baad push karna hai.” ✅**

---

## ✅ Branch pe commit ke baad **push ka correct process**

Maan lo tum branch par ho:

```
feature/super-admin-setup
```

---

## 🔹 STEP 1: Check branch (MOST IMPORTANT)

```bash
git branch
```

Output example:

```
* feature/super-admin-setup
  main
```

👉 `*` wali branch = active
✔ Agar feature branch active hai → aage badho

---

## 🔹 STEP 2: Changes check karo

```bash
git status
```

Example:

```
modified: setup.service.ts
modified: setup.controller.ts
```

---

## 🔹 STEP 3: Files add karo (stage)

### Sab files add karni ho:

```bash
git add .
```

### Ya specific file:

```bash
git add setup.service.ts
```

---

## 🔹 STEP 4: Commit karo

```bash
git commit -m "feat: add super admin setup skeleton"
```

✔ Ab commit ho gaya
✔ Abhi GitHub pe nahi gaya (sirf local)

---

## 🔹 STEP 5: Branch push karo (FIRST TIME)

⚠️ **Ye command pehli baar branch push karte waqt important hoti hai**

```bash
git push -u origin feature/super-admin-setup
```

### Iska matlab:

* `origin` → GitHub
* `feature/super-admin-setup` → tumhari branch
* `-u` → future me simple push allow

---

## 🔁 STEP 6: Next time sirf ye chalega

```bash
git push
```

---

## 🧠 Agar error aaye:

### “fatal: The current branch has no upstream branch”

👉 Matlab `-u` use nahi hua
Fix:

```bash
git push -u origin feature/super-admin-setup
```

---

## 🎯 Full flow (YAAD RAKHO)

```
git branch
git status
git add .
git commit -m "message"
git push -u origin feature-name
```

---

## 🧠 Interview me bolne wali line

> “I commit changes on feature branches and push them to remote before creating pull requests.”

---

## 🔥 Ab tum try karo

1️⃣ `git branch`
2️⃣ `git push -u origin <tumhari-branch>`

Aur mujhe batao 👇

* **koi error aaya ya push successful hua?**

Agar error aaya, exact message bhejna — main turant solve karwaunga 💪
