import React from "react";
import { prettyDOM, render } from "@testing-library/react";

import { Login } from './Login';

describe('Login' , () => {
  it('should be rendered', () => {
    render(<Login />);
    console.log(prettyDOM);
  });
});
