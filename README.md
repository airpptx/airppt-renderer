### Project Overview

Wouldn't it be great if we could use a slideshow canvas as WSIWYG editor to rapidly design and ship UIs or start coding?

Airppt was built from the ground up to utilize the design elements of PPT presentations and reuse them anywhere. It is built with modularity, extensibility and flexibility in mind whilst abstracting a lot of the complexity. It's **not** a direct PPTX -> HTML converter; more like PPTX -> JSON -> HTML instead.

I'd also love for you to contribute. New to open source? I'm happy to walkthrough how to close your first issue. Pick a [time](https://goo.gl/forms/7NjFEYayLOuYdr2q1) that works best for you.

# airppt-renderer

The renderer is a module designed to convert from standardized airppt JSON [powerpoint elements](https://github.com/airpptx/airppt-parser/blob/master/README.md#powerpoint-element) to HTML/CSS.

You can see all of the implemented [renderers](https://github.com/airpptx/airppt-renderer/tree/master/ts/renderers) here. They can be either a `Shape` or a `Speciality` type.

The gist of a renderer is to convert a valid `PowerpointElement` with the correct HTML and CSS.

Each specific renderer is an implemention of an `abstract` renderer class as follows. We determine which specific renderer to use at runtime depending on the [element type](https://github.com/airpptx/airppt-renderer/blob/master/ts/renderers/index.ts):

```typescript
abstract class ElementRenderer {
	//jquery is available for your use
	protected $ = jquery(new jsdom.JSDOM().window);

	//beautify is available to make your CSS clean
	protected beautify = textBeautify;

	//See Interface Definitions Below
	constructor(
		protected scaler: GridScaler,
		protected element: PowerpointElement,
		protected powerpointDetails: PowerpointDetails,
		protected rendererOptions: RendererOptions
	);

	//each renderer MUST implement these
	public abstract getHTML(): string;
	public abstract getCSS(): string;

	//You SHOULD call this and return it as part of your getCSS implementation
	protected getPositionCSS() {}

	//useful function that converts powerpoint tiff image paths
	protected getOutputImagePath(tiffPath) {}
}
```
