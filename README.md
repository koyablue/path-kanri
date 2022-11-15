![linkedin_banner_image_2](https://user-images.githubusercontent.com/43242050/201691053-6ff17776-77b4-4566-815f-8981b162289a.png)

# Path-Kanri
Path-Kanri is a utility module for managing paths.  

By using Path-Kanri, you can
- register paths with names and get paths by names.
- avoid hard coding paths.

(by the way, kanri means management in Japanese.)

## Built with

![](https://img.shields.io/badge/-TypeScript-3178C6?logo=typescript&logoColor=white)
![](https://img.shields.io/badge/-Node.js-339933?logo=node.js&logoColor=white)
![](https://img.shields.io/badge/-ESLint-4B32C3?logo=eslint&logoColor=white)
![](https://img.shields.io/badge/-GitHub%20Actions-2088FF?logo=githubactions&logoColor=white)
![](https://img.shields.io/badge/-Jest-C21325?logo=jest&logoColor=white)
![](https://img.shields.io/badge/-npm-CB3837?logo=npm&logoColor=white)

## Installation
```
npm install path-kanri
```

## Getting Started
- import pathManager from 'path-kanri'
- provide object to pathManager
	- name as keys, paths as values
	- enclose parameters in braces

```typescript
import pathManager from 'path-kanri';

// name: '/path/{parameterName1}/{parameterName2}'
const { getPath } = pathManager({
  example: '/example/{exampleId}/{slug}',
  users: '/users',
  userProfile: '/users/{userId}',
  userPosts: '/users/{userId}/posts',
  userPost: '/users/{userId}/posts/{postId}',
});

export { getPath }
```

## Usage

Import.
```typescript
import { getPath } from './lib/pathManager'
```

Get a registered path by name.
```typescript
getPath('example', { exampleId: 1, slug: 'abc' })
// returns '/example/1/abc'
```

With query parameters.
```typescript
getPath('example', { exampleId: 1, slug: 'abc' }, { page: '1', type: 'fire' })
// returns '/example/1/abc/?page=1&type=fire'
```

## Motivation
In front-end coding I often encounter hard coded paths like this.
```typescript
import { useRouter } from 'next/router'

const ExampleComponent = () => {
  const router = useRouter()

  const randomFunc = () => {
    // do something
    router.push(`/example/${exampleId}/${slug}`) // <- THIS!!
  }

  return(
    <div>
    </div>
  )
}
```

Hard coded paths are magic numbers so they should be avoided.  
Laravel(PHP framework) has a very useful function to solve this kind of problem. You can name URI and get it by the name with route() helper function like this.
```php
route('route.name', ['param1' => 1, 'param2' => 2])
```
I was inspired by this cool feature and made Path-Kanri.

## License

This project is licensed under the [**MIT License**](https://github.com/koyablue/path-kanri/blob/main/LICENSE).
