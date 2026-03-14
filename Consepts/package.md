# package 
---

1. why packages are exist ?
   A package is a folder that contains related classes and interfaces.
   * To Organize Code
     *  If your project has 100+ classes, everything in one place becomes messy.
     *  Packages help group related classes.  
   * To Avoid Name Conflicts
     *  Two classes can have the same name if they are in different packages.
   * To Make Code Easier to Maintain
     * When your project grows, packages help developers quickly find files.
   * To Control Access (Security)
     * Java packages help control who can access classes and methods using access modifiers.
   * Used by Frameworks (Spring Boot)
     * Frameworks like Spring Boot automatically scan packages.

---

Think of a college library.

```
Library
 ├── Science Books
 ├── History Books
 ├── Computer Books
```
Each section is like a package.

Books = Classes
Sections = Packages           