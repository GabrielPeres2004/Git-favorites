import { GitHubUsers } from "./GitHubUser.js"

export class Favorites {
    constructor(root) {
        this.root = document.querySelector(root)
        this.tbody = this.root.querySelector('table tbody')
        this.load()
    }

    load() {
        this.entries = JSON.parse(localStorage.getItem('@github-favorites:')) || []
    }

    save() {
        localStorage.setItem('@github-favorites:', JSON.stringify(this.entries))
    }

    async add(username) {
        try {
            const user = await GitHubUsers.search(username)

            const userExist = this.entries.find(entry => entry.login === user.login)

            if (userExist) {
                throw new Error('Usuário já existente.')
            }

            if (user.login === undefined) {
                throw new Error('Usuário não encontrado.')
            }

            this.entries = [user, ...this.entries]
            this.updateAll()
            this.save()

        } catch (error) {
            alert(error.message)

        }

    }

    delete(user) {
        const filteredEntries = this.entries.filter(entry => entry.login != user.login)

        this.entries = filteredEntries
        this.updateAll()
        this.save()
    }
}

export class FavoritesView extends Favorites {
    constructor(root) {
        super(root)
        this.updateAll()
        this.onadd()
    }



    updateAll() {
        this.removeAllTr()


        this.entries.forEach(user => {
            const row = this.createRow()
            const butttonRemoveTr = row.querySelector('.delete')

            row.querySelector('.user img').src = `https://github.com/${user.login}.png`
            row.querySelector('.user img').alt = `Imagem de ${user.login}`

            row.querySelector('.user a').href = `https://github.com/${user.login}`

            row.querySelector('.user p').textContent = user.name
            row.querySelector('.user span').textContent = ` /${user.login}`

            row.querySelector('.repositories').textContent = user.repositories
            row.querySelector('.followers').textContent = user.followers

            butttonRemoveTr.addEventListener('click', () => {
                let isOk = confirm('Você deseja remover?')

                if (isOk) {
                    this.delete(user)
                }
            })

            this.tbody.append(row)

        })
    }

    onadd() {
        const buttonAdd = this.root.querySelector('.add')
        buttonAdd.addEventListener('click', () => {
            const { value } = this.root.querySelector('header input')

            this.add(value)

        })
    }

    createRow() {
        const tr = document.createElement('tr')

        tr.innerHTML =
            `<tr>
                    <td class="user">
                        <img src="https://github.com/gabrielperes2004.png" alt="Imagem do usuário">
                        <a href="https://github.com/gabrielperes2004" target="_blank">
                            <p class="name">Gabriel Peres</p>
                            <span class="login">gabrielperes2004</span>
                        </a>
                    </td>
                    <td class="repositories">
                        <span>15</span>
                    </td>

                    <td class="followers">
                        1
                    </td>

                    <td class="delete">
                        <span>Remover</span>
                    </td>
                </tr>
                `

        return tr

    }


    removeAllTr() {
        this.tbody.querySelectorAll('tr').forEach(tr => {
            tr.remove()

        });
    }
}