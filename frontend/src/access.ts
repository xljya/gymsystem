/**
 * @see https://umijs.org/docs/max/access#access
 * */
export default function access(initialState: { currentUser?: API.LoginMemberVO } | undefined) {
  const { currentUser } = initialState ?? {};
  return {
    canAdmin: currentUser && currentUser.memberRole === 'admin',
  };
}
