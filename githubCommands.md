# 🧾 Git Commands Used – With Purpose 

---

## 1️⃣ Check global Git email

```bash
git config --global user.email
```

**Use:**
👉 Git ke global level pe kaunsa email set hai, ye check karne ke liye.
👉 Debugging ke liye first step.

---

## 2️⃣ Check commit author email (last commits)

```bash
git log --pretty=format:"%an <%ae>" -5
```

**Use:**
👉 Last 5 commits me **author name + email** dekhne ke liye.
👉 Email mismatch (gamil.com vs gmail.com) identify karne ke liye.

---

## 3️⃣ Set Git user for current repo

```bash
git config user.name "Rahul Shinde"
git config user.email "rahulshinde2577@gmail.com"
```

**Use:**
👉 Sirf **current repository** ke liye correct name & email set karna.
👉 Future commits sahi author ke saath ho isliye.

---

## 4️⃣ Set Git user globally

```bash
git config --global user.name "Rahul Shinde"
git config --global user.email "rahulshinde2577@gmail.com"
```

**Use:**
👉 System ke **saare future repos** ke liye correct identity set karna.

---

## 5️⃣ Create empty test commit

```bash
git commit --allow-empty -m "test: github avatar linking"
```

**Use:**
👉 Sirf testing ke liye commit banana (code change ke bina).
👉 Check karna ki avatar & email correctly link ho raha hai ya nahi.

---

## 6️⃣ Push commits to GitHub

```bash
git push
```

**Use:**
👉 Local commits ko remote (GitHub) repository pe upload karna.

---

## 7️⃣ Create backup branch

```bash
git branch backup-before-email-fix
```

**Use:**
👉 History rewrite se pehle **safety backup** banana.
👉 Agar kuch galat ho jaaye to easily wapas aa sakte hain.

---

## 8️⃣ Rewrite commit history (email fix)

```bash
git filter-branch --env-filter '
export GIT_AUTHOR_NAME="Rahul Shinde"
export GIT_AUTHOR_EMAIL="rahulshinde2577@gmail.com"
export GIT_COMMITTER_NAME="Rahul Shinde"
export GIT_COMMITTER_EMAIL="rahulshinde2577@gmail.com"
' -- --all
```

**Use:**
👉 **Purane commits ke author/committer email** correct karne ke liye.
👉 GitHub avatar & author attribution fix karne ke liye.

---

## 9️⃣ Targeted history rewrite (specific email)

```bash
git filter-branch --force --env-filter '
if [ "$GIT_AUTHOR_EMAIL" = "rahulshinde2577@gamil.com" ]; then
    export GIT_AUTHOR_NAME="Rahul Shinde"
    export GIT_AUTHOR_EMAIL="rahulshinde2577@gmail.com"
fi
if [ "$GIT_COMMITTER_EMAIL" = "rahulshinde2577@gamil.com" ]; then
    export GIT_COMMITTER_NAME="Rahul Shinde"
    export GIT_COMMITTER_EMAIL="rahulshinde2577@gmail.com"
fi
' -- --all
```

**Use:**
👉 Sirf **galat typo email** wale commits ko fix karne ke liye.

---

## 🔟 Clean reflog and garbage collection

```bash
git reflog expire --expire=now --all
git gc --prune=now --aggressive
```

**Use:**
👉 Git ke internal cache / old references clean karne ke liye.
👉 Purani incorrect history completely remove karne ke liye.

---

## 1️⃣1️⃣ Force push rewritten history

```bash
git push --force --all
git push --force --tags
```

**Use:**
👉 Rewritten history ko GitHub pe overwrite karne ke liye.
👉 **Sirf personal/college repo ke liye safe**.

---

## 1️⃣2️⃣ Delete local backup branch

```bash
git branch -D backup-before-email-fix
```

**Use:**
👉 Backup branch ko local machine se delete karna (cleanup).

---

## 1️⃣3️⃣ Delete remote backup branch

```bash
git push origin --delete backup-before-email-fix
```

**Use:**
👉 GitHub se backup branch remove karna.
👉 Repository ko clean & professional rakhne ke liye.

---
