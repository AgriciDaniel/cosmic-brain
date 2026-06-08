---
title: Image
route: /Image
icon: Image
---

# Image
A **FluentImage** is a component that displays an image. It can be used to display a single image or a list of images.

## Default
{{FluentImageDefault}}

## Width and Height
The `Width` and `Height` parameters can be set to change the size of the internal image tag used when the source parameter is set.
{{FluentImageWidthHeight}}

## Block
The `Block` parameter can be set to make the image's width expand to fill the available container space.

For example, the following image has a width and height of 200px, but it will expand to its containers width whilst remaining its aspect ratio.
{{FluentImageBlock}}

## Border
The `Border` parameter can be set to add a border around the image.
{{FluentImageBorder}}

## Fit
The `Fit` parameter can be set to change how the image will be scaled and positioned within its parent container.
{{FluentImageFit}}

## Shadow
The `Shadow` parameter can be set to add a shadow around the image.
{{FluentImageShadow}}

## Shape
The `Shape` parameter can be set to change the shape of the image.
{{FluentImageShape}}

## Customize styling on the image
FluentImage is a wrapper around an image tag if the source parameter is set. To customize the styling of the internal image,
you can use the `fluent-image-item` class.
{{FluentImageCustomStyling Files=Razor:FluentImageCustomStyling.razor;CSS:FluentImageCustomStyling.razor.css}}

## Custom content
You can provide any content inside the Fluent image as long as it is a image or a list of images. Any image inside the FluentImage will have the parameters of the component,
except for the `Style`, `Class`, `Width`, `Height` and `AlternateText` parameters. This can, for example, be used with multiple images.

{{FluentImageMultiple}}

##  API FluentImage

{{ API Type=FluentImage }}
