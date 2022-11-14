![linkedin_banner_image_2](https://user-images.githubusercontent.com/43242050/201691053-6ff17776-77b4-4566-815f-8981b162289a.png)

# Path-Kanri
Path-Kanri is a utility module for managing paths.  

By using Path-Kanri, you can
- register paths with names and get paths by names.
- avoid hard coding paths.

(by the way, kanri means management in Japanese.)

---

tech stack here

---

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
Laravel(PHP framework) has a very useful function to solve this kind of problem. You can name URI and get it by the name by route() helper function like this.
```php
route('route.name', ['param1' => 1, 'param2' => 2])
```
I was inspired by this cool feature and made Path-Kanri.

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
```typescript
import { getPath } from './lib/pathManager'

getPath('example', { exampleId: 1, slug: 'abc' })
// returns '/example/1/abc'
```

### Prerequisities


## Built With

* Dropwizard - Bla bla bla
* Maven - Maybe
* Atom - ergaerga

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct, and the process for submitting pull requests to us.

## Versioning

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags). 

## Authors

* **John Doe** - *Initial work* - [JohnDoe](https://github.com/JohnDoe)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.

## License

This project is licensed under the **BSD License** - see the [LICENSE.md](LICENSE.md) file for details.

## Acknowledgments

* Hat tip to anyone who's code was used
* Inspiration
* etc