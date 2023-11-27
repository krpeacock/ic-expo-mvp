export const idlFactory = ({ IDL }) => {
  const Backend = IDL.Service({
    'greet' : IDL.Func([IDL.Text], [IDL.Text], []),
  });
  return Backend;
};
export const init = ({ IDL }) => { return []; };
