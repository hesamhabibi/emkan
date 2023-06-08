export default {
  rounded: `.rounded20 {
  @include rounded(12px);
}`,
  shadow: `@import "styles/variables"  
.shadowLarge {
  @include box-shadow($box-shadow-1);
}
`,
  transition: `@include transition(0.4s ease-out);`,
  transform: `@include transform(translate(-50%, -50%));`,
  color: `@include generate-color(background, $white, lighten, 20%);`,
  grid: `@include grid(flex, row);`,
  hover: `@include hover {
  @include generate-color($black); 
}
@include active {
  @include generate-color($gray-light);
}
@include focus {
  @include generate-color(gray);
}
`,
};
