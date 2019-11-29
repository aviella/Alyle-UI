import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LyCardModule } from '@alyle/ui/card';

import { DemoViewModule } from '../demo-view';

/** Components */
/** Button */
import { ButtonDemoComponent } from './components/button-demo/button-demo.component';
import { ButtonTypesDemoModule } from './components/button-demo/button-types-demo/button-types-demo.module';
import { IconLabelButtonsModule } from './components/button-demo/icon-label-buttons/icon-label-buttons.module';

import { LyTypographyModule } from '@alyle/ui/typography';
import { DocsRoutingModule } from './docs.routing';
import { SharedModule } from '../shared/shared.module';

import { ToolbarDemoComponent } from './components/toolbar-demo/toolbar-demo.component';
import { ToolbarBasicDemoModule } from './components/toolbar-demo/toolbar-basic-demo/toolbar-basic-demo.module';
import { ToolbarWithIconsModule } from './components/toolbar-demo/toolbar-with-icons/toolbar-with-icons.module';
import { ToolbarDenseModule } from './components/toolbar-demo/toolbar-dense/toolbar-dense.module';

// tslint:disable-next-line:max-line-length
import { ImageCropperExample01Module } from './components/image-cropper-demo/image-cropper-example-01/image-cropper-example-01.module';
// tslint:disable-next-line:max-line-length
import { ImageCropperExample02Module } from './components/image-cropper-demo/image-cropper-example-02/image-cropper-example-02.module';
// tslint:disable-next-line:max-line-length
import { ImageCropperExample03Module } from './components/image-cropper-demo/image-cropper-example-03/image-cropper-example-03.module';
import { ImageCropperDemoComponent } from './components/image-cropper-demo/image-cropper-demo.component';

import { BadgeDemoComponent } from './components/badge-demo/badge-demo.component';
import { BasicBadgeModule } from './components/badge-demo/basic-badge/basic-badge.module';
import { CustomBadgeModule } from './components/badge-demo/custom-badge/custom-badge.module';
import { DotBadgeModule } from './components/badge-demo/dot-badge/dot-badge.module';

/** Field */
import { FieldDemoComponent } from './components/field-demo/field-demo.component';
import { BasicFieldModule } from './components/field-demo/basic-field/basic-field.module';
import { FieldPlaygroundModule } from './components/field-demo/field-playground/field-playground.module';
import { SimpleFormModule } from './components/field-demo/simple-form/simple-form.module';

/** Checkbox */
import { CheckboxDemoComponent } from './components/checkbox-demo/checkbox-demo.component';
import { BasicCheckboxModule } from './components/checkbox-demo/basic-checkbox/basic-checkbox.module';
import { ComplexCheckboxModule } from './components/checkbox-demo/complex-checkbox/complex-checkbox.module';

import { PackageStatusModule } from '../package-status/package-status.module';

import { BasicSnackBarModule } from './components/snack-bar-demo/basic-snack-bar/basic-snack-bar.module';
import { SnackBarDemoComponent } from './components/snack-bar-demo/snack-bar-demo.component';

/** Icon demo */
import { IconDemoComponent } from './components/icon-demo/icon-demo.component';
import { IconsModule } from './components/icon-demo/icons/icons.module';

/** Tooltip */
import { TooltipDemoComponent } from './components/tooltip-demo/tooltip-demo.component';
import { BasicTooltipModule } from './components/tooltip-demo/basic-tooltip/basic-tooltip.module';

/** Menu */
import { MenuDemoComponent } from './components/menu-demo/menu-demo.component';
import { MenuDemo01Module } from './components/menu-demo/menu-demo-01/menu-demo-01.module';

/** Avatar */
import { AvatarDemoComponent } from './components/avatar-demo/avatar-demo.component';
import { BasicUsesAvatarModule } from './components/avatar-demo/basic-uses-avatar/basic-uses-avatar.module';
import { ListDemoComponent } from './components/list-demo/list-demo.component';
import { AvatarWithButtonModule } from './components/avatar-demo/avatar-with-button/avatar-with-button.module';

/** List */
import { SimpleListModule } from './components/list-demo/simple-list/simple-list.module';
import { FolderListModule } from './components/list-demo/folder-list/folder-list.module';

/** Divider */
import { DividerDemoComponent } from './components/divider-demo/divider-demo.component';
import { ListDividersModule } from './components/divider-demo/list-dividers/list-dividers.module';
import { InsetDividersModule } from './components/divider-demo/inset-dividers/inset-dividers.module';

/** Typography */
import { TypographyDemoComponent } from './components/typography-demo/typography-demo.component';
import { TruncateTextModule } from './components/typography-demo/truncate-text/truncate-text.module';
import { TypographyDemoBasicModule } from './components/typography-demo/typography-demo-basic/typography-demo-basic.module';

/** Drawer */
import { DrawerDemoComponent } from './components/drawer-demo/drawer-demo.component';
import { DrawerDemo01Module } from './components/drawer-demo/drawer-demo-01/drawer-demo-01.module';
import { MiniDrawerModule } from './components/drawer-demo/mini-drawer/mini-drawer.module';

/** Radio */
import { RadioDemoComponent } from './components/radio-demo/radio-demo.component';
import { RadioExample01Module } from './components/radio-demo/radio-example-01/radio-example-01.module';
import { BasicRadioModule } from './components/radio-demo/basic-radio/basic-radio.module';

/** Select */
import { SelectDemoComponent } from './components/select-demo/select-demo.component';
import { BasicSelectModule } from './components/select-demo/basic-select/basic-select.module';
import { SelectWithNgModelModule } from './components/select-demo/select-with-ng-model/select-with-ng-model.module';
import { SelectMultipleModule } from './components/select-demo/select-multiple/select-multiple.module';
import { SelectReactiveFormModule } from './components/select-demo/select-reactive-form/select-reactive-form.module';
import { SelectOptionObjectValueModule } from './components/select-demo/select-option-object-value/select-option-object-value.module';
import { SelectDisableModule } from './components/select-demo/select-disable/select-disable.module';
import { SelectCustomTriggerModule } from './components/select-demo/select-custom-trigger/select-custom-trigger.module';

/** Dialog */
import { DialogDemoComponent } from './components/dialog-demo/dialog-demo.component';
import { BasicDialogModule } from './components/dialog-demo/basic-dialog/basic-dialog.module';
import { DialogResponsiveModule } from './components/dialog-demo/dialog-responsive/dialog-responsive.module';
import { FullScreenDialogModule } from './components/dialog-demo/full-screen-dialog/full-screen-dialog.module';
import { DialogPromptModule } from './components/dialog-demo/dialog-prompt/dialog-prompt.module';
import { DialogNgTemplateModule } from './components/dialog-demo/dialog-ng-template/dialog-ng-template.module';

/** Carousel */
import { CarouselDemoComponent } from './components/carousel-demo/carousel-demo.component';
import { CarouselExample01Module } from './components/carousel-demo/carousel-example-01/carousel-example-01.module';
import { CarouselWithGesturesModule } from './components/carousel-demo/carousel-with-gestures/carousel-with-gestures.module';
import { CarouselWithBarModule } from './components/carousel-demo/carousel-with-bar/carousel-with-bar.module';
import { CarouselPauseOnHoverModule } from './components/carousel-demo/carousel-pause-on-hover/carousel-pause-on-hover.module';

/** Expansion */
import { ExpansionDemoComponent } from './components/expansion-demo/expansion-demo.component';
import { BasicExpansionModule } from './components/expansion-demo/basic-expansion/basic-expansion.module';
import { CustomExpansionPanelModule } from './components/expansion-demo/custom-expansion-panel/custom-expansion-panel.module';

import { LazyLoadingComponent } from './guides/lazy-loading/lazy-loading.component';

/** Slider */
import { SliderDemoComponent } from './components/slider-demo/slider-demo.component';
import { BasicSliderModule } from './components/slider-demo/basic-slider/basic-slider.module';
import { SliderPlaygroundModule } from './components/slider-demo/slider-playground/slider-playground.module';

@NgModule({
  imports: [
    SharedModule,
    RouterModule,
    DemoViewModule,
    DocsRoutingModule,
    PackageStatusModule,
    LyTypographyModule,
    LyCardModule,
    /** Typography */
    TypographyDemoBasicModule,
    TruncateTextModule,
    /** Button */
    ButtonTypesDemoModule,
    IconLabelButtonsModule,
    /** Toolbar */
    ToolbarBasicDemoModule,
    ToolbarWithIconsModule,
    ToolbarDenseModule,
    /** Image cropper */
    ImageCropperExample01Module,
    ImageCropperExample02Module,
    ImageCropperExample03Module,
    /** Badge */
    BasicBadgeModule,
    CustomBadgeModule,
    DotBadgeModule,
    /** Field */
    BasicFieldModule,
    FieldPlaygroundModule,
    SimpleFormModule,
    /** Checkbox */
    BasicCheckboxModule,
    ComplexCheckboxModule,
    /** SnackBar */
    BasicSnackBarModule,
    /** Icon */
    IconsModule,
    /** Tooltip */
    BasicTooltipModule,
    /** Menu */
    MenuDemo01Module,
    /** Avatar */
    BasicUsesAvatarModule,
    AvatarWithButtonModule,
    /** List */
    SimpleListModule,
    FolderListModule,
    /** Divider */
    ListDividersModule,
    InsetDividersModule,
    /** Drawer */
    DrawerDemo01Module,
    MiniDrawerModule,
    /** Radio */
    RadioExample01Module,
    BasicRadioModule,
    /** Select */
    BasicSelectModule,
    SelectWithNgModelModule,
    SelectMultipleModule,
    SelectReactiveFormModule,
    SelectOptionObjectValueModule,
    SelectDisableModule,
    SelectCustomTriggerModule,
    /** Dialog */
    BasicDialogModule,
    DialogResponsiveModule,
    FullScreenDialogModule,
    DialogPromptModule,
    DialogNgTemplateModule,
    /** Carousel */
    CarouselExample01Module,
    CarouselWithGesturesModule,
    CarouselWithBarModule,
    CarouselPauseOnHoverModule,
    /** Expansion */
    BasicExpansionModule,
    CustomExpansionPanelModule,
    /** Slider */
    BasicSliderModule,
    SliderPlaygroundModule
  ],
  declarations: [
    /** Button */
    ButtonDemoComponent,
    /** Toolbar */
    ToolbarDemoComponent,
    /** Image cropper */
    ImageCropperDemoComponent,
    /** Badge */
    BadgeDemoComponent,
    /** Field */
    FieldDemoComponent,
    /** Ckeckbox */
    CheckboxDemoComponent,
    /** SnackBar */
    SnackBarDemoComponent,
    /** Icon */
    IconDemoComponent,
    /** Tooltip */
    TooltipDemoComponent,
    /** Menu */
    MenuDemoComponent,
    /** Avatar */
    AvatarDemoComponent,
    /** List */
    ListDemoComponent,
    /** Divider */
    DividerDemoComponent,
    /**Typography */
    TypographyDemoComponent,
    /** Drawer */
    DrawerDemoComponent,
    /** Radio */
    RadioDemoComponent,
    /** Select */
    SelectDemoComponent,
    /** Dialog */
    DialogDemoComponent,
    /** Carousel */
    CarouselDemoComponent,
    /** Expansion */
    ExpansionDemoComponent,
    /** Lazy Loading */
    LazyLoadingComponent,
    /** Slider */
    SliderDemoComponent
  ]
})
export class DocsModule { }
