import UseCategory from '../../../../components/UI/useCategory.jsx'
import cseImg from '../../../../assets/cse.png'
import bbaImg from '../../../../assets/bba.png'
import eeeImg from '../../../../assets/eee.png'
import civilImg from '../../../../assets/civil.png'
import engImg from '../../../../assets/english.png'
import islamicImg from '../../../../assets/islamic.png'
import lawImg from '../../../../assets/Law.png'
import { Link } from 'react-router-dom'

export default function Categories() {
    return (
        <div className="w-8/12 mx-auto">
            <div className="text-center my-10">
                <h1 className="text-3xl font-bold mb-2">
                    Explore by Department
                </h1>
                <p>
                    Browse books and resources categorized by academic
                    departments to find exactly what you need.
                </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 px-5">
                <Link to={'/cse'}>
                    <UseCategory
                        image={cseImg}
                        category={'Computer Science and Engineering'}
                    ></UseCategory>
                </Link>

                <Link to={'/bba'}>
                    <UseCategory image={bbaImg} category={'BBA'}></UseCategory>
                </Link>

                <Link to={'/civil'}>
                    <UseCategory
                        image={civilImg}
                        category={'Civil Engineering'}
                    ></UseCategory>
                </Link>

                <Link to={'/eee'}>
                    <UseCategory
                        image={eeeImg}
                        category={'Electrical and Electronics Engineering'}
                    ></UseCategory>
                </Link>

                <Link to={'/english'}>
                    <UseCategory
                        image={engImg}
                        category={'English'}
                    ></UseCategory>
                </Link>

                <Link to={'/islamic'}>
                    <UseCategory
                        image={islamicImg}
                        category={'Islamic Studies'}
                    ></UseCategory>
                </Link>

                <Link to={'/law'}>
                    <UseCategory
                        image={lawImg}
                        category={'Bachelor of Laws'}
                    ></UseCategory>
                </Link>
            </div>
        </div>
    )
}
