import { useQueryClient } from 'react-query'
import { useDeletePostMutation, usePostsQuery } from '../generated/graphql'

const Posts = () => {
    const queryClient = useQueryClient()
    const { data, isLoading } = usePostsQuery()
    const { mutate } = useDeletePostMutation({
        onSuccess: () => queryClient.invalidateQueries('Posts'),
    })

    return (
        <>
            {isLoading && <p>Loading ...</p>}
            {data &&
                data.posts?.map(post => (
                    <div key={post?.id}>
                        <p>{post?.title}</p>
                        <button onClick={() => post && mutate({ id: post.id })}>
                            Delete
                        </button>
                        <hr />
                    </div>
                ))}
        </>
    )
}

export default Posts