## safeParse() ALWAYS Returns ONLY 2 Possible Shapes
Success
```js
{
  success: true,
  data: ...
}
```
Failure
```js
{
  success: false,
  error: ...
}
```
---
## Err
```js
{
  success: false,

  error: ZodError
}
```
flatten() Simplifies Errors

```js
{
  formErrors: [],

  fieldErrors: {
    username: [
      "username must be at least 3 chars"
    ],

    email: [
      "Invalid email"
    ],

    password: [
      "Password must be at least 6 chars"
    ]
  }
}
```
---

